import { CurrencyPipe, LowerCasePipe } from "@angular/common";
import { Component, Input, Pipe } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import {MatButtonModule } from '@angular/material/button'
import { Product } from "src/app/models/product";
import { RatingComponent } from "./components/rating.component";

@Component({
    selector:"mc-product-card",
    standalone:true,
    template:`<div [class]="'flex flex-col rounded-md p-3 bg-gray-200 gap-2 hover:scale-105 transition-all duration-300 ' + style">
        <div>
            <img [src]="data.image" [alt]="data.title" class="object-cover w-full h-48 rounded-md overflow-hidden">
        </div>
        <div class="flex flex-col text-black">
            <p class="text-ellipsis line-clamp-1">{{data.title}}</p>
            <mc-rating [rate]="data.rating.rate"></mc-rating>
            <p class="text-ellipsis line-clamp-2 opacity-70 text-sm">{{data.description | lowercase}}</p>
            <p class="text-xl text-gray-600">{{data.price | currency : 'USD'}}</p>
            <button mat-flat-button color="primary" class="!rounded-full capitalize">
                <mat-icon>shopping_cart</mat-icon>add to cart
        </button>
            
        </div>
    </div>`,
    styles:[],
    imports:[MatIconModule,MatButtonModule,CurrencyPipe,LowerCasePipe,RatingComponent]
})
export class ProductCardComponent {
    @Input() data!:Product;
    @Input() style?:string;

}