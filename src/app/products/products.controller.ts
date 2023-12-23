import { Controller, Get, Post, Patch, Delete,Body, Param, Query, NotFoundException } from '@nestjs/common';

import { Public } from 'src/libs/security/decorators/public.decorator';
import { ProductsService } from './products.service';
import { CreateProductDto } from 'src/domain/dtos/create-product.dto';
import { UpdateProductDto } from 'src/domain/dtos/update-product.dto';
import { ProductQueryDto } from 'src/domain/dtos/product-query.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Public()
  @Get('categories')
  async findAllCategories() {
    return this.productsService.findAllCategories();
  }

  @Public()
  @Get('/pages/:categoryName')
  async countPagesOfCategory(@Param('categoryName') categoryName: string) {
    return this.productsService.countPagesOfCategory(categoryName);
  }

  @Public()
  @Get('/pages')
  async countPages() {
    return this.productsService.countPages();
  }

  @Public()
  @Get(':productId')
  async findById(@Param('productId') productId: string) {
    const product = await this.productsService.findById(productId);
    if (!product) {
      throw new NotFoundException(`Product with the id of ${productId} does not exist.`);
    }
    return product;
  }

  @Public()
  @Get()
  async findAllQuery(@Query() {category, page}: ProductQueryDto) {
    if (page && category) {
      const products = await this.productsService.findAPageOfProductsOfCategory(page, category);
      if (!products.length) {
        throw new NotFoundException(`There are no products in ${category} category on page ${page}.`);
      }
      return products;
    };
    if (!page && category) {
      const products = await this.productsService.findProductsOfCategory(category);
      if (!products.length) {
        throw new NotFoundException(`There are no products in ${category} category.`);
      }
      return products;
    };
    if (page && !category) {
      const products = await this.productsService.findAPageOfProducts(page);
      if (!products.length) {
        throw new NotFoundException(`There no products on page ${page}.`);
      }
      return products;
    }
    return this.productsService.findAll();
  }

  @Patch(':productId')
  async update(@Param('productId') productId: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(productId, updateProductDto);
  }

  @Delete(':productId')
  async delete(@Param('productId') productId: string) {
    return this.productsService.delete(productId);
  }
}
