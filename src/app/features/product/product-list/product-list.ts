import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { Product } from '../../../core/models/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.html',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  error = '';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
        console.log('Loaded products:', data);
      },
      error: (err) => {
        console.error('API Error:', err);
        this.error = 'Failed to load products.';
        this.loading = false;
      },
    });
  }

  addToCart(product: Product) {
    const CustId = Number(localStorage.getItem('CustId'));
    const date = String(new Date());
    if (!product) {
      return;
    }
    this.api
      .addToCart(0, CustId, product.productId, 1, date)
      .subscribe(() => alert('Added to cart!'));
  }
}
