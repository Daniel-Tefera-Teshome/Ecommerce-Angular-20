import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
})
export class RegisterComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private message: NotificationService
  ) {
    this.form = this.fb.group({
      Name: ['', Validators.required],
      MobileNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const customer = {
      CustId: 0,
      ...this.form.value,
    };

    this.authService.register(customer).subscribe({
      next: () => {
        this.message.success('Success', 'Registration successfully created!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        this.message.error('Error', 'Registration Failed Please try again.');
      },
    });
  }
}
