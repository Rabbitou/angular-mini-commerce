import { Component, inject } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'mc-home',
  template: `
    <section class="flex flex-col h-full mx-auto max-w-4xl justify-center items-center mt-2">
      <div *ngIf="products" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
      <article *ngFor="let product of products"><mc-product-card [data]="product" /></article>
    </div>
    </section>
  `,
  styles: [
  ]
})
export class HomeComponent {
 private readonly productService = inject(ProductService);

 products!: Product[];
 ngOnInit() {
  this.fetchAllProducts();
 }

 fetchAllProducts () {
  this.productService.getAllProduct().subscribe(res => this.products = res);
 }
}
