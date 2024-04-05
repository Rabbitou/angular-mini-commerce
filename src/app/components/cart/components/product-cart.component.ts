import { CurrencyPipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartItem } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'mc-product-cart',
  standalone: true,
  template: `<div
    class="flex justify-start items-center space-x-2 lg:space-x-7 p-4 rounded-3xl hover:bg-bg-secondary"
  >
    <img [src]="product.image" alt="" class="w-16 md:w-20" />
    <div class="flex flex-1 justify-between items-center">
      <div class="">
        <p class="font-semibold text-base line-clamp-1">
          {{ product.title }}
        </p>
        <p class="text-xs lg:text-sm line-clamp-1">
          {{ product.description }}
        </p>

        <div
          class="flex justify-start items-center text-xs lg:text-sm space-x-2"
        >
          <button
            mat-icon-button
            color="primary"
            [disabled]="cartProduct.quantity <= 1"
            (click)="decreaseItemCart(product.id)"
          >
            <mat-icon>remove</mat-icon>
          </button>

          <span class="text-black">{{ cartProduct.quantity }}</span>
          <button
            mat-icon-button
            color="primary"
            (click)="addToCart(product.id)"
          >
            <mat-icon>add</mat-icon>
          </button>
        </div>
      </div>
      <div class="flex flex-col justify-center items-center">
        <p
          class="font-semibold text-sm md:text-lg whitespace-nowrap lg:group-hover:hidden"
        >
          {{ product.price * cartProduct.quantity | currency }}
        </p>
        <button
          mat-icon-button
          color="primary"
          (click)="removeFromCart(product.id)"
        >
          <mat-icon>delete</mat-icon>
        </button>
      </div>
    </div>
  </div>`,
  imports: [MatIconModule, CurrencyPipe, MatButtonModule],
})
export class ProductCartComponent {
  @Input() product!: Product;
  @Input() cartProduct!: CartItem;

  private cartService = inject(CartService);

  decreaseItemCart(id: number) {
    this.cartService.decreaseItemCart(id);
  }

  addToCart(id: number) {
    this.cartService.addToCart(id);
  }

  removeFromCart(id: number) {
    this.cartService.removeFromCart(id);
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
