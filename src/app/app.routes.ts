import { Routes } from '@angular/router';
import { ProductListComponent } from './features/product/product-list/product-list';
import { CartPageComponent } from './features/cart/cart-page';
import { CheckoutComponent } from './features/checkout/checkout';
import { ContactComponent } from './features/contact/contact';
import { LoginComponent } from './features/login/login';
import { RegisterComponent } from './features/register/register';
import { TermsComponent } from './features/terms/terms';
import { PrivacyComponent } from './features/privacy/privacy';
import { ProductDetailComponent } from './features/product/product-detail/product-detail';

export const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'privacy', component: PrivacyComponent },

  { path: '**', redirectTo: '' },
];
