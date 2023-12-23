import {
  IsNotEmpty,
  IsInt,
  IsUUID
} from 'class-validator';

export class CreateOrderItemDto {

  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @IsUUID()
  orderId: string;
}