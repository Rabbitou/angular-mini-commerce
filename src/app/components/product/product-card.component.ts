import { Component, Input } from "@angular/core";
import { Product } from "src/app/models/product";

@Component({
    selector:"mc-product-card",
    template:`<div class="flex flex-col rounded-md p-3 bg-gray-200 gap-2">
        <div><img [src]="data.image" [alt]="data.title" class="object-cover w-full h-48 rounded-md overflow-hidden"></div>
        <div class="flex flex-col text-black">
            <p class="text-ellipsis line-clamp-1">{{data.title}}</p>
            <p class="text-ellipsis line-clamp-2 opacity-70 text-sm">{{data.description | lowercase}}</p>
            <p>{{data.price | currency}}</p>
            
        </div>
    </div>`,
    styles:[]
})
export class ProductCardComponent {
    @Input() data!:Product;

}