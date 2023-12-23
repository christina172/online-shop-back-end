import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/libs/prisma/prisma.service';
import { OptionalExceptFor } from 'src/domain/types/optional-except-for.type';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsRepo {
  constructor(private readonly prisma: PrismaService) { }

  async create(product: OptionalExceptFor<Product, 'name' | 'brand' | 'category' | 'description' | 'price' | 'in_stock'>) {
    return this.prisma.product.create({
      data: product
    });
  }

  async findAll() {
    return this.prisma.product.findMany({
      orderBy: {
        name: 'asc'
      }
    });
  }

  async findAllCategories() {
    return this.prisma.product.findMany({
      distinct: 'category',
      select: {
        category: true
      },
      orderBy: {
        category: 'asc'
      }
    });
  }

  async findAPageOfProducts(skip: number, amountPerPage: number) {
    return this.prisma.product.findMany({
      where: {
        in_stock:{
          gt: 0
        }
      },
      skip: skip,
      take: amountPerPage,
      orderBy: {
        name: 'asc'
      }
    })
  }

  async countPages(amountPerPage: number) {
    const productsNumber = await this.prisma.product.count({
      where: {
        in_stock:{
          gt: 0
        }
      }
    });
    const pageCount = Math.ceil(productsNumber/amountPerPage);
    return pageCount;
  }

  async findProductsOfCategory(categoryName: string) {
    return this.prisma.product.findMany({
      where: {
        category: categoryName
      },
      orderBy: {
        name: 'asc'
      }
    })
  }

  async findAPageOfProductsOfCategory(skip: number, categoryName: string, amountPerPage: number) {
    return this.prisma.product.findMany({
      skip: skip,
      take: amountPerPage,
      where: {
        AND: [
          {
            category: categoryName
          },
          {
            in_stock:{
              gt: 0
            }
          }
        ]
      },
      orderBy: {
        name: 'asc'
      }
    })
  }

  async countPagesOfCategory(categoryName: string, amountPerPage: number) {
    const productsNumber = await this.prisma.product.count({
      where: {
        AND: [
          {
            category: categoryName
          },
          {
            in_stock:{
              gt: 0
            }
          }
        ]
      }
    })

    const pageCount = Math.ceil(productsNumber/amountPerPage);
    return pageCount;
  }

  async findById(productId: string) {
    return this.prisma.product.findUnique({
      where: {id: productId}
    })
  }

  async update(productId: string, product: Partial<Product>) {
    return this.prisma.product.update({
      where: { id: productId },
      data: product,
    });
  }

  async delete(productId: string) {
    return this.prisma.product.delete({ where: { id: productId } });
  }
}
