import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-4xl mx-auto px-6 py-12">
      <h1 class="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p class="mb-4">
        Your privacy is important to us. This Privacy Policy outlines how we collect, use, and
        protect your personal information when you use our services.
      </p>
      <p class="mb-4">
        We collect only necessary information to provide you with a better shopping experience. We
        do not sell or share your data with third parties.
      </p>
      <p class="mb-4">By using our site, you consent to our privacy practices as described here.</p>
      <p class="text-sm text-gray-500 mt-6">Last updated: October 20, 2025</p>
    </div>
  `,
})
export class PrivacyComponent {}
