import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-form',
  template: `
    <div class="contact-container">
      <h2>Get In Touch</h2>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <input type="text" formControlName="name" placeholder="Your Name" class="form-control">
        <input type="email" formControlName="email" placeholder="Your Email" class="form-control">
        <input type="tel" formControlName="phone" placeholder="Phone (optional)" class="form-control">
        <input type="text" formControlName="company" placeholder="Company (optional)" class="form-control">
        <textarea formControlName="message" placeholder="Your Message" class="form-control"></textarea>
        <button type="submit" [disabled]="!form.valid">Send Message</button>
        <p *ngIf="success" class="success">Message sent successfully!</p>
        <p *ngIf="error" class="error">{{ error }}</p>
      </form>
    </div>
  `,
  styles: [`.contact-container { max-width: 600px; margin: 50px auto; padding: 30px; } .form-control { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px; } button { width: 100%; padding: 10px; background: var(--primary); color: white; border: none; border-radius: 4px; cursor: pointer; } .success { color: green; } .error { color: red; }`]
})
export class ContactFormComponent {
  form: FormGroup;
  success = false;
  error: string | null = null;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      company: [''],
      message: ['', Validators.required]
    });
  }
  onSubmit() {
    if (!this.form.valid) return;
    this.http.post('/api/v1/contact-requests/submit', this.form.value).subscribe({
      next: () => { this.success = true; this.form.reset(); },
      error: () => this.error = 'Failed to send message'
    });
  }
}

