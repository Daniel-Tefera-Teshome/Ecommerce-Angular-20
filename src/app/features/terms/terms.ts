import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-4xl mx-auto px-6 py-12">
      <h1 class="text-3xl font-bold mb-6">Terms of Service</h1>
      <p class="mb-4">
        Welcome to Mini E-Com. By accessing and using our services, you agree to the following terms
        and conditions.
      </p>
      <p class="mb-4">
        You must use the service responsibly and not for any unlawful purpose. We reserve the right
        to suspend or terminate access to users who violate these terms.
      </p>
      <p class="mb-4">
        We may update these terms from time to time. Continued use of the site means you accept the
        revised terms.
      </p>
      <p class="text-sm text-gray-500 mt-6">Last updated: October 20, 2025</p>
    </div>
  `,
})
export class TermsComponent {}
