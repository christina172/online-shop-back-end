import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma/prisma.service';

@Injectable()
export class OrdersRepo {
  constructor(private readonly prisma: PrismaService) { }

  async create(userId: string) {
    return  this.prisma.order.create({
      data: {
        userId: userId
        }
      }
    );
  }

  async findById(orderId: string) {
    return this.prisma.order.findUnique({
      where: {id: orderId},
      include: {
        order_items: {
          include: {
            product: true
          }
        }
      }
    })
  }

  async findAll() {
    return this.prisma.order.findMany({
      orderBy: {
        updatedAt: 'desc'
      }
    })
  }

  async findCartByUserId(userId: string) {
    return this.prisma.order.findFirst({
      where: {
        userId: userId,
        status: "CART"
      },
      include: {
        order_items: {
          include: {
            product: true
          }
        }
      }
    })
  }

  async findOrdersByUserId(userId: string) {
    return this.prisma.order.findMany({
      where: {
        OR: [
          {status: "PLACED"},
          {status: "CANCELLED"}
        ],
        AND: {
          userId: userId
        }
      },
      select: {
        status: true,
        order_total: true,
        updatedAt: true,
        id: true,
        order_items: {
          select: {
            id: true,
            quantity: true,
            price: true,
            product: {
              select: {
                name: true,
                brand: true
              }
            }
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })
  }

  async placeAnOrder(orderId: string) {
    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({
        where: {
          id: orderId
        },
        include: {
          order_items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                  in_stock: true
                }
              }
            }
          }
        }
      });

      let message="";
      for (const item of order.order_items) {
        if (item.quantity > item.product.in_stock) {
          message += `Quantity of ${item.product.name} should be less than or equal to ${item.product.in_stock}. `;
        }
      };

      if (message) {
        throw new ConflictException(message);
      };

      let total=0;
      for (const item of order.order_items) {
        await tx.orderItem.update({
          where: {
            id: item.id
          },
          data: {
            price: item.product.price
          }
        })

        total += item.product.price*item.quantity;

        await tx.product.update({
          where: {
            id: item.product.id
          },
          data: {
            in_stock: {
              decrement: item.quantity
            }
          }
        })
      }

      return this.prisma.order.update({
        where: {id: orderId},
        data: {
          order_total: total,
          status: "PLACED"
        } 
      })
    })
  }

  async cancelAnOrder(orderId: string) {
    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({
        where: {
          id: orderId
        },
        include: {
          order_items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                  in_stock: true
                }
              }
            }
          }
        }
      });

      for (const item of order.order_items) {
        await tx.product.update({
          where: {
            id: item.product.id
          },
          data: {
            in_stock: {
              increment: item.quantity
            }
          }
        })
      }

      return this.prisma.order.update({
        where: {id: orderId},
        data: {
          order_total: 0,
          status: "CANCELLED"
        } 
      })
    })
  }

  async delete(orderId: string) {
    return this.prisma.order.delete({ where: { id: orderId } });
  }

}