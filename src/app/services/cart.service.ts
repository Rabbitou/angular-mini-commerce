import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";
import { CartItem } from "../models/cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {

	private cartSubject = new BehaviorSubject<CartItem[]>(this.getCart());
	public cartItems$ = this.cartSubject.asObservable();

	private showCart = new BehaviorSubject<boolean>(false);
  public showCart$ = this.showCart.asObservable();

	toggleCart() {
		// this.showCart.next()
	}

	totalItems$ = this.cartItems$.pipe(
    map((items) => items.reduce((acc, item) => acc + item.quantity, 0))
  );

	private getCart(): CartItem[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  private setCart(items: CartItem[]): void {
    localStorage.setItem('cart', JSON.stringify(items));
  }

}