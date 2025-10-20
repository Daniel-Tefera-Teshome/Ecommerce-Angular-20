import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AsyncPipe, CommonModule, NgIf, NgTemplateOutlet } from '@angular/common';
import { AuthService } from './core/services/auth.service'; // adjust the path as needed

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.html',
})
export class App {
  authService = inject(AuthService);
  currentYear = new Date().getFullYear();

  logout() {
    this.authService.logout();
  }
}
