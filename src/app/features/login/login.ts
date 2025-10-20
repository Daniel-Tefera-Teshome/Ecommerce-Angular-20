import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class LoginComponent {
  form: FormGroup;
  errorMessage: string | null = null;
  isLoading = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      mobileNo: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const { mobileNo, password } = this.form.value;
    this.isLoading = true;

    this.auth.login(mobileNo, password).subscribe({
      next: () => {
        this.router.navigate(['/']);
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Login failed. Please check your credentials.';
        console.error(err);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
