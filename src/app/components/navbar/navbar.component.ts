import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from 'src/app/services/cart.service';
import { CartDialogComponent } from '../cart/cart-dialog.component';

@Component({
  selector: 'mc-navbar',
  standalone: true,
  template: `
    <nav class="h-12 bg-black w-full sticky flex justify-between text-white">
      <div
        class="flex items-center px-3 text-2xl bg-gradient-to-l from-white to-[#4758B8] text-transparent bg-clip-text"
      >
        M-Commerce
      </div>
      <div
        class="relative mx-2 cursor-pointer flex items-center"
        (click)="openDialog()"
      >
        <mat-icon
          aria-hidden="false"
          fontIcon="shopping_cart"
          class="text-4xl text-white !w-10 !h-10"
        ></mat-icon>
        <div
          class="bg-red-500 absolute top-0 right-0 h-5 w-5 rounded-full flex justify-center text-white"
        >
          {{ totalItems$ | async }}
        </div>
      </div>
    </nav>
  `,
  styles: [],
  imports: [MatIconModule, AsyncPipe, MatDialogModule],
})
export class NavbarComponent {
  private cartService = inject(CartService);

  totalItems$ = this.cartService.totalItems$;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(CartDialogComponent, {});
  }
}
