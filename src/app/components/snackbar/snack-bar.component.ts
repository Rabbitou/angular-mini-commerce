import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'mc-snack-bar',
  standalone: true,
  template: `<div class="flex justify-center items-center gap-3">
    <span class="" matSnackBarLabel>Item Added To Cart</span>
    <span matSnackBarActions>
      <button
        mat-icon-button
        matSnackBarAction
        (click)="snackBarRef.dismissWithAction()"
      >
        <mat-icon color="primary">check_circle</mat-icon>
      </button>
    </span>
  </div>`,
  imports: [MatIconModule, MatButtonModule],
})
export class SnackBarComponent {
  snackBarRef = inject(MatSnackBarRef);
}
