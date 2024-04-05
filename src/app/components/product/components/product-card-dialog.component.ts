import { CurrencyPipe, LowerCasePipe } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { RatingComponent } from './rating.component';

@Component({
  selector: '',
  standalone: true,
  template: `<div class="flex flex-col lg:w-[700px]">
    <p
      class="line-clamp-1 text-ellipsis border-b-2 text-center text-xl px-2 pt-2 pb-1"
    >
      {{ data.title }}
    </p>
    <mat-dialog-content
      ><div class="flex flex-col md:grid grid-cols-3 gap-4 items-center">
        <img
          [src]="data.image"
          [alt]="data.title"
          class="h-36 w-36 rounded-md overflow-hidden col-span-1"
        />
        <div
          class="flex flex-col justify-center col-span-2 bg-gray-200 p-4 rounded"
        >
          <p class="text-xl text-gray-600">
            {{ data.price | currency : 'USD' }}
          </p>
          <mc-rating [rate]="data.rating.rate"></mc-rating>
          <p class="opacity-70 text-black text-sm">
            {{ data.description | lowercase }}
          </p>
          <button
            mat-flat-button
            color="primary"
            class="!rounded-full capitalize"
            (click)="addToCart(data.id)"
          >
            <mat-icon>shopping_cart</mat-icon>add to cart
          </button>
        </div>
      </div>
    </mat-dialog-content>
  </div>`,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    RatingComponent,
    LowerCasePipe,
    CurrencyPipe,
  ],
})
export class ProductCardDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ProductCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {}
  private cartService = inject(CartService);

  addToCart(id: number) {
    this.cartService.addToCart(id);
  }
}
