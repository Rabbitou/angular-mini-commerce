import { CommonModule, NgFor } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    selector:"mc-rating",
    standalone:true,
    template:`
    <div class="flex gap-4">
        <div class="flex gap-2">
            <svg *ngFor="let i of Arr(rating).fill(1)" class="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>
            <svg *ngFor="let i of Arr(empty).fill(1)" class="w-4 h-4 text-gray-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
            </svg>
        </div>
        <p class="">{{rate}}</p>
    </div>
    `,
    imports:[CommonModule]
})
export class RatingComponent {
    @Input() rate!:number;
    Arr = Array;

    rating:number = 0;
    empty:number = 0;

    ngOnInit() {
        this.removeDecimal();
    }
    removeDecimal() {
        this.rating = parseInt(this.rate.toString().split('.')[1]) < 5 ? Math.floor(this.rate) : Math.ceil(this.rate);
        this.empty = 5 - this.rating;
    }
}