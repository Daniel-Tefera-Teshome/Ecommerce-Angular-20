import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

interface LoginResponse {
  // adjust fields to what your API returns
  token: string;
  customerId: number;
  // maybe more user info
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiPrefix = '/api/amazon';
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('auth_token');
    this._isLoggedIn.next(!!token);
  }
  register(customer: {
    CustId: number;
    Name: string;
    MobileNo: string;
    Password: string;
  }): Observable<any> {
    return this.http.post(`${this.apiPrefix}/RegisterCustomer`, customer);
  }
  login(userName: string, userPassword: string): Observable<boolean> {
    return this.http
      .post<any>(`${this.apiPrefix}/Login`, {
        UserName: userName,
        UserPassword: userPassword,
      })
      .pipe(
        tap((response) => {
          if (response.result) {
            // Save user data
            localStorage.setItem('CustId', response.data.custId.toString());
            localStorage.setItem('UserName', response.data.name);
            localStorage.setItem('UserPassword', response.data.mobileNo);
            this._isLoggedIn.next(true);
          } else {
            throw new Error('Login failed');
          }
        }),
        map((response) => response.result)
      );
  }
  private hasStoredLogin(): boolean {
    return !!localStorage.getItem('CustId');
  }

  get customerId(): string | null {
    return localStorage.getItem('CustId');
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('CustId');
    this._isLoggedIn.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getCustomerId(): number | null {
    const id = localStorage.getItem('CustId');
    return id ? +id : null;
  }
}
