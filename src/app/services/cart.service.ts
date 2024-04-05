import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { CartItem } from '../models/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>(this.getCart());
  public cartItems$ = this.cartSubject.asObservable();

  totalItems$ = this.cartItems$.pipe(
    map((items) => items.reduce((acc, item) => acc + item.quantity, 0))
  );

  getItems(): CartItem[] {
    return this.cartSubject.value;
  }

  private getCart(): CartItem[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  private setCart(items: CartItem[]): void {
    localStorage.setItem('cart', JSON.stringify(items));
  }

  addToCart(id: number) {
    const items = this.cartSubject.value;
    const currItem = items.findIndex((i) => i.id === id);
    if (currItem !== -1) {
      items[currItem].quantity++;
    } else {
      items.push({ id, quantity: 1 });
    }
    this.cartSubject.next(items);
    this.setCart(items);
  }

  decreaseItemCart(id: number) {
    const items = this.cartSubject.value;
    const currItem = items.findIndex((i) => i.id === id);
    if (currItem !== -1) {
      if (items[currItem].quantity > 1) {
        items[currItem].quantity--;
      } else {
        items.splice(currItem, 1);
      }
    }
    this.cartSubject.next(items);
    this.setCart(items);
  }

  removeFromCart(id: number) {
    const items = this.cartSubject.value;
    const currItem = items.findIndex((i) => i.id === id);
    if (currItem !== -1) items.splice(currItem, 1);
    this.cartSubject.next(items);
    this.setCart(items);
  }

  clearCart() {
    this.cartSubject.next([]);
    this.setCart([]);
  }
}
