import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../core/services/cart.service';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-page.html',
})
export class CartPageComponent implements OnInit {
  items: CartItem[] = [];
  loading = true;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.fetchCart();
  }

  fetchCart() {
    this.api.getCartProductsByCustomer(0).subscribe((data) => {
      this.items = data;
      this.loading = false;
    });
  }

  remove(id: number) {
    this.api.removeCartItem(id).subscribe(() => this.fetchCart());
  }

  get total() {
    return this.items.reduce((sum, item) => sum + item.product.productPrice * item.quantity, 0);
  }
}
