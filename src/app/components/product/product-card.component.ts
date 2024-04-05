import { CurrencyPipe, LowerCasePipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { SnackBarComponent } from '../snackbar/snack-bar.component';
import { ProductCardDialogComponent } from './components/product-card-dialog.component';
import { RatingComponent } from './components/rating.component';

@Component({
  selector: 'mc-product-card',
  standalone: true,
  template: `<div
    [class]="
      'flex flex-col rounded-md p-3 bg-gray-200 gap-2 hover:scale-105 transition-all duration-300 ' +
      style
    "
  >
    <div>
      <img
        [src]="data.image"
        [alt]="data.title"
        class="object-cover w-full h-48 rounded-md overflow-hidden cursor-pointer"
        (click)="openDialog()"
      />
    </div>
    <div class="flex flex-col text-black">
      <p class="text-ellipsis line-clamp-1">{{ data.title }}</p>
      <mc-rating [rate]="data.rating.rate"></mc-rating>
      <p class="text-ellipsis line-clamp-2 opacity-70 text-sm">
        {{ data.description | lowercase }}
      </p>
      <p class="text-xl text-gray-600">{{ data.price | currency : 'USD' }}</p>
      <button
        mat-flat-button
        color="primary"
        class="!rounded-full capitalize"
        (click)="addToCart(data.id); openSnackBar()"
      >
        <mat-icon>shopping_cart</mat-icon>add to cart
      </button>
    </div>
  </div>`,
  styles: [],
  imports: [
    MatIconModule,
    MatButtonModule,
    CurrencyPipe,
    LowerCasePipe,
    RatingComponent,
    MatSnackBarModule,
  ],
})
export class ProductCardComponent {
  @Input() data!: Product;
  @Input() style?: string;

  private cartService = inject(CartService);
  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) {}

  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: 2 * 1000,
    });
  }

  openDialog(): void {
    this.dialog.open(ProductCardDialogComponent, { data: this.data });
  }

  addToCart(id: number) {
    this.cartService.addToCart(id);
  }
}
