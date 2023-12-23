import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  IsNumber,
  IsUrl
} from 'class-validator';

export class CreateProductDto{
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsUrl()
  image?: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsInt()
  in_stock: number;
}