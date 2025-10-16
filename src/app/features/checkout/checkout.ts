import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartItem } from '../../core/services/cart.service';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.html',
})
export class CheckoutComponent {
  form: ReturnType<FormBuilder['group']>;
  cartItems: CartItem[] = [];
  submitted = false;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
    });
    // Fetch cart for guest user
    this.api.getCartProductsByCustomer(0).subscribe((items) => (this.cartItems = items));
  }

  get total() {
    return this.cartItems.reduce((sum, item) => sum + item.product.productPrice * item.quantity, 0);
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) return;

    const orderData = {
      customerId: 0,
      cartItems: this.cartItems,
      shippingInfo: this.form.value,
    };

    this.api.placeOrder(0, this.cartItems).subscribe(() => {
      alert('Order placed successfully!');
      this.cartItems = [];
    });
  }
}
