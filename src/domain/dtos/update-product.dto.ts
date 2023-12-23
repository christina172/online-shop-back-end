import {
  IsOptional,
  IsString,
  IsInt,
  IsNumber,
  IsUrl
} from 'class-validator';

export class UpdateProductDto{
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  image?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsInt()
  in_stock?: number;
}