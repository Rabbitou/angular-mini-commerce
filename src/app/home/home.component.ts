import { Component, inject } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { ProductCardComponent } from '../components/product/product-card.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'mc-home',
  standalone: true,
  template: `
  <section class="flex flex-col h-full mx-auto max-w-4xl justify-center items-center mt-2">
    <div class="flex w-full justify-between p-2">
      <div class="bg-gray-200 h-9 flex items-center gap-1 text-gray-700 rounded-sm p-2">
        <mat-icon>search</mat-icon>
        <input
          type="text"
          name=""
          id=""
          class="outline-none bg-transparent"
          placeholder="Search..."
          (keyup)="search($event)"
        />
      </div>
      <select
        name="category"
        id="category"
        class="p-2 bg-gray-200 rounded-sm text-gray-700 outline-none capitalize"
        (change)="applyFilterCategory($event)"
      >
        <option value="">Filter category...</option>
        
          <option *ngFor="let cat of listCategories" key={item} value={{cat}}>
          {{cat}}
          </option>
      </select>
    </div>
    <div *ngIf="listProduct" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
      <article *ngFor="let product of listProduct">
        <mc-product-card [data]="product" [style]="'max-w-[350px]'" />
      </article>
    </div>
  </section>
  `,
  styles: [
  ],
  imports:[MatIconModule,ProductCardComponent,NgFor,NgIf]
})
export class HomeComponent {
	private readonly productService = inject(ProductService);
  private readonly searchSubject = new Subject<string>();

	allProducts!: Product[];
  listCategories!: string[];
  listProduct!: Product[];


	ngOnInit() {
		this.fetchAllProducts();
    this.fetchAllCategories();
    this.searchSubject
      .pipe(
        debounceTime(300), // Wait for 300ms pause in events
        distinctUntilChanged() // Only emit if the current value is different than the last
      )
      .subscribe((searchTerm) => {
        this.applyFilterSearch(searchTerm);
      });
	}
  
  search(event: any): void {
    this.searchSubject.next(event.target.value);
  }

  applyFilterSearch(searchTerm: string): void {
    this.listProduct = this.allProducts.filter(
      (item) =>
        item.description.trim()
          .toLowerCase()
          .includes(searchTerm) ||
        item.title.trim().toLowerCase().includes(searchTerm)
    )
  }

  applyFilterCategory(event: any) {
    this.listProduct = event.target.value ? this.allProducts.filter(item => item.category === event.target.value.toLowerCase()) : this.allProducts;
  }

	fetchAllProducts() {
		this.productService.getAllProduct().subscribe(res => this.allProducts = this.listProduct = res);
	}

  fetchAllCategories() {
    this.productService.getAllCategories().subscribe(res => this.listCategories = res)
  }

}
