import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { MatIconModule } from '@angular/material/icon';
import { CartItem } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductCartComponent } from './components/product-cart.component';

@Component({
  selector: 'mc-cart-dialog',
  standalone: true,
  template: `
    <div class="flex items-center justify-between p-4 w-full border-b">
      <h3 mat-dialog-title class="text-xl font-semibold">Your cart</h3>
    </div>
    <mat-dialog-content class="!min-h-60 md:!w-[550px] w-[300px]">
      <div
        class="relative flex-auto p-4 overflow-y-auto w-full border-b max-sm:text-sm"
      >
        <div class="flex justify-between items-center mb-2">
          <p class="font-semibold max-md:text-xs">
            {{ totalItems$ | async }} Articles
          </p>
          <button
            mat-stroked-button
            color="warn"
            class="!rounded-full max-md:!w-28 capitalize max-md:!text-xs"
            (click)="clearCart()"
          >
            <mat-icon>delete</mat-icon>clear cart
          </button>
        </div>
        <article *ngFor="let item of cartItems$ | async">
          <mc-product-cart
            *ngIf="findProduct(item.id)"
            [product]="findProduct(item.id)!"
            [cartProduct]="item"
          ></mc-product-cart>
        </article>
      </div>

      <div class="flex flex-col items-center justify-end w-full p-4">
        <div class="flex items-center justify-between w-full mb-4">
          <span class="font-semibold text-sm">Total</span>
          <span class="font-semibold text-lg" *ngIf="totalPrice()">
            {{ totalPrice() | currency }}
          </span>
        </div>
        <button
          mat-flat-button
          color="primary"
          class="!rounded-full capitalize !w-full"
          cdkFocusInitial
        >
          checkout
        </button>
      </div>
    </mat-dialog-content>
  `,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    AsyncPipe,
    ProductCartComponent,
    NgFor,
    NgIf,
    CurrencyPipe,
  ],
})
export class CartDialogComponent {
  constructor(public dialogRef: MatDialogRef<CartDialogComponent>) {}
  private cartService = inject(CartService);
  private productService = inject(ProductService);

  products!: Product[];
  totalItems$ = this.cartService.totalItems$;
  cartItems$ = this.cartService.cartItems$;

  ngOnInit() {
    this.fetchAllProduct();
  }

  totalPrice(): number {
    return this.cartService
      .getItems()
      .reduce((total: number, cartProduct: CartItem) => {
        const product = this.products
          ? this.products.find((item) => item.id === cartProduct.id)
          : null;
        return total + (product?.price || 0) * cartProduct.quantity;
      }, 0);
  }

  findProduct(id: number) {
    return this.products && this.products.find((pro) => pro.id === id);
  }

  fetchAllProduct() {
    this.productService
      .getAllProduct()
      .subscribe((res) => (this.products = res));
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
