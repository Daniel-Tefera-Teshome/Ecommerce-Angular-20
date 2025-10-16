import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';

export interface CartItem {
  product: Product;
  quantity: number;
  id: any;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private items$ = new BehaviorSubject<CartItem[]>([]);
  items = this.items$.asObservable();

  addToCart(product: Product, qty = 1) {
    const items = [...this.items$.value];
    const idx = items.findIndex((i) => i.product.productId === product.productId);
    if (idx > -1) items[idx].quantity += qty;
    else items.push({ product, quantity: qty, id: product.productId });
    this.items$.next(items);
  }

  removeFromCart(productId: number) {
    this.items$.next(this.items$.value.filter((i) => i.product.productId !== productId));
  }

  updateQty(productId: number, qty: number) {
    const items = this.items$.value.map((i) =>
      i.product.productId === productId ? { ...i, qty } : i
    );
    this.items$.next(items);
  }

  clear() {
    this.items$.next([]);
  }

  getTotal() {
    return this.items$.value.reduce((s, i) => s + i.product.productPrice * i.quantity, 0);
  }
}
