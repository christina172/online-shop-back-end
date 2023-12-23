import { Injectable } from '@nestjs/common';

import { Product } from '@prisma/client';
import { ProductsRepo } from 'src/domain/repos/products.repo';
import { OptionalExceptFor } from 'src/domain/types/optional-except-for.type';
import { capitalize } from 'src/domain/utils/capitalize';

@Injectable()
export class ProductsService {
  constructor(private productsRepo: ProductsRepo){}

  private readonly amountPerPage: number = 3;

  async create(product: OptionalExceptFor<Product, 'name' | 'brand' | 'category' | 'description' | 'price' | 'in_stock'>) {
    const capitalizedCategoryName = capitalize(product.category);
    return this.productsRepo.create({
      ...product,
      category: capitalizedCategoryName
    });
  }

  async findAll() {
    return this.productsRepo.findAll();
  }

  async findAllCategories() {
    return this.productsRepo.findAllCategories();
  }

  async findAPageOfProducts(page: number) {
    const skip = (page-1)*this.amountPerPage;
    return this.productsRepo.findAPageOfProducts(skip, this.amountPerPage);
  }

  async countPages() {
    return this.productsRepo.countPages(this.amountPerPage);
  }

  async findProductsOfCategory(categoryName: string) {
    const capitalizedCategoryName = capitalize(categoryName);
    return this.productsRepo.findProductsOfCategory(capitalizedCategoryName);
  }

  async findAPageOfProductsOfCategory(page:number, categoryName: string) {
    const skip = (page-1)*this.amountPerPage;
    const capitalizedCategoryName = capitalize(categoryName);
    return this.productsRepo.findAPageOfProductsOfCategory(skip, capitalizedCategoryName, this.amountPerPage);
  }

  async countPagesOfCategory(categoryName: string) {
    return this.productsRepo.countPagesOfCategory(categoryName, this.amountPerPage);
  }

  async findById(productId: string) {
    return this.productsRepo.findById(productId);
  }

  async update(productId: string, product: Partial<Product>) {
    if (product.category) {
      const capitalizedCategoryName = capitalize(product.category);
      product.category = capitalizedCategoryName;
    }
    return this.productsRepo.update(productId, product);
  }

  async delete(productId: string) {
    return this.productsRepo.delete(productId);
  }
}
