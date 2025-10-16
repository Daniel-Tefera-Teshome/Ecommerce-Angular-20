import { Routes } from '@angular/router';
import { ProductListComponent } from './features/product/product-list/product-list';
import { ProductDetailComponent } from './features/product/product -datail/product-detail';
import { CartPageComponent } from './features/cart/cart-page';
import { CheckoutComponent } from './features/checkout/checkout';

export const routes: Routes = [
  { path: 'product', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '**', redirectTo: '' },
];
