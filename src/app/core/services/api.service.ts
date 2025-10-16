import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Product } from '../models/product';
import { CartItem } from './cart.service';
import { Customer } from '../models/customer';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = '/api/Ecommerce';
  private defaultUserId = 1;

  constructor(private http: HttpClient) {}
  get userId(): number {
    return Number(localStorage.getItem('userId')) || 1;
  }

  // Products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<any>(`${this.base}/GetAllProducts?userId=${this.userId}`).pipe(
      map((res) => {
        // The API returns { message: string, result: boolean, data: [...] }
        if (res && res.data && Array.isArray(res.data)) {
          return res.data;
        } else {
          console.warn('Unexpected API response structure:', res);
          return [];
        }
      }),
      catchError((err) => {
        console.error('Error loading products', err);
        return throwError(() => err);
      })
    );
  }
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.base}/GetProductById?id=${id}`);
  }

  getProductsByCategoryId(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.base}/GetAllProductsByCategoryId?categoryId=${categoryId}`
    );
  }

  // Cart
  getCartProductsByCustomer(customerId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(
      `${this.base}/GetCartProductsByCustomerId?customerId=${customerId}`
    );
  }

  addToCart(customerId: number, productId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.base}/AddToCart`, {
      customerId,
      productId,
      quantity,
    });
  }

  removeCartItem(cartItemId: number): Observable<any> {
    return this.http.get(`${this.base}/DeleteProductFromCartById?id=${cartItemId}`);
  }

  // Checkout / Orders
  placeOrder(customerId: number, cartItems: CartItem[]): Observable<any> {
    return this.http.post(`${this.base}/PlaceOrder`, { customerId, cartItems });
  }

  // Categories
  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/GetAllCategory`);
  }

  // Customer
  registerCustomer(data: Partial<Customer> & { password: string }): Observable<Customer> {
    return this.http.post<Customer>(`${this.base}/RegisterCustomer`, data);
  }

  login(email: string, password: string): Observable<Customer> {
    return this.http.post<Customer>(`${this.base}/Login`, { email, password });
  }
}
