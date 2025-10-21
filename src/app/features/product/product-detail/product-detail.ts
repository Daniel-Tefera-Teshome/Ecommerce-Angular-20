import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';
import { Product } from '../../../core/models/product';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.html',
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  loading = true;

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  addToCart() {
    const CustId = Number(localStorage.getItem('CustId'));
    const date = String(new Date());
    if (!this.product) {
      return;
    }
    this.api
      .addToCart(0, CustId, this.product.productId, 1, date)
      .subscribe(() => alert('Added to cart!'));
  }
}
