import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'mc-navbar',
  standalone: true,
  template: `
    <nav class="h-12 bg-black w-full sticky flex justify-between text-white">
      <div class="flex items-center px-3 text-2xl">Home</div>
      <div class="relative mx-2">
        <mat-icon aria-hidden="false" fontIcon="shopping_cart" class="text-5xl text-white !w-12 !h-12"></mat-icon>
        <div class="bg-red-500 absolute top-0 right-0 h-5 w-5 rounded-full flex justify-center text-white">0</div>
      </div>

    </nav>
  `,
  styles: [
  ],
  imports:[MatIconModule]
})
export class NavbarComponent {

}
