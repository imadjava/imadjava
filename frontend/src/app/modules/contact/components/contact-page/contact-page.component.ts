import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../../../services/contact.service';

@Component({
  selector: 'app-contact-page',
  template: `
    <section class="page-header">
      <div class="container">
        <div class="page-header-content reveal">
          <div class="section-label">Contact</div>
          <h1 class="heading-lg">Let's Start a <span class="text-gradient">Conversation</span></h1>
          <p class="page-desc">Have a project in mind? Looking for a senior developer? I'd love to hear from you.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info reveal">
            <div class="info-card glass-card">
              <h3 class="heading-md" style="margin-bottom:24px">Contact Information</h3>
              <div class="info-item">
                <div class="info-icon"><i class="fas fa-envelope"></i></div>
                <div>
                  <div class="info-label">Email</div>
                  <div class="info-value">contact&#64;devportfolio.com</div>
                </div>
              </div>
              <div class="info-item">
                <div class="info-icon"><i class="fas fa-map-marker-alt"></i></div>
                <div>
                  <div class="info-label">Location</div>
                  <div class="info-value">San Francisco, CA</div>
                </div>
              </div>
              <div class="info-item">
                <div class="info-icon"><i class="fas fa-clock"></i></div>
                <div>
                  <div class="info-label">Availability</div>
                  <div class="info-value">Full-time / Contract</div>
                </div>
              </div>
              <div class="social-section">
                <div class="info-label" style="margin-bottom:12px">Follow Me</div>
                <div class="social-links">
                  <a href="https://github.com" target="_blank"><i class="fab fa-github"></i></a>
                  <a href="https://linkedin.com" target="_blank"><i class="fab fa-linkedin"></i></a>
                  <a href="https://twitter.com" target="_blank"><i class="fab fa-twitter"></i></a>
                  <a href="https://stackoverflow.com" target="_blank"><i class="fab fa-stack-overflow"></i></a>
                </div>
              </div>
            </div>
          </div>

          <div class="contact-form-wrapper reveal">
            <div class="glass-card">
              <h3 class="heading-md" style="margin-bottom:24px">Send a Message</h3>
              <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
                <div class="form-row">
                  <div class="form-group" style="flex:1">
                    <label class="form-label">Name *</label>
                    <input type="text" class="form-input" formControlName="name" placeholder="Your name">
                    <div class="form-error" *ngIf="f['name'].invalid && f['name'].touched">Name is required</div>
                  </div>
                  <div class="form-group" style="flex:1">
                    <label class="form-label">Email *</label>
                    <input type="email" class="form-input" formControlName="email" placeholder="your@email.com">
                    <div class="form-error" *ngIf="f['email'].invalid && f['email'].touched">Valid email is required</div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group" style="flex:1">
                    <label class="form-label">Phone</label>
                    <input type="tel" class="form-input" formControlName="phone" placeholder="+1-555-0123">
                  </div>
                  <div class="form-group" style="flex:1">
                    <label class="form-label">Company</label>
                    <input type="text" class="form-input" formControlName="company" placeholder="Your company">
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">Message *</label>
                  <textarea class="form-textarea" formControlName="message" placeholder="Tell me about your project..."></textarea>
                  <div class="form-error" *ngIf="f['message'].invalid && f['message'].touched">Message is required</div>
                </div>

                <div class="form-success" *ngIf="success" style="color:var(--success);margin-bottom:16px;padding:12px;background:rgba(0,212,170,0.1);border-radius:var(--radius-md)">
                  <i class="fas fa-check-circle"></i> {{success}}
                </div>
                <div class="form-error" *ngIf="error" style="margin-bottom:16px">{{error}}</div>

                <button type="submit" class="btn btn-primary w-full" [disabled]="contactForm.invalid || loading">
                  <span *ngIf="!loading"><i class="fas fa-paper-plane"></i> Send Message</span>
                  <div class="spinner" style="width:20px;height:20px;border-width:2px;margin:0 auto" *ngIf="loading"></div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-header { padding: 120px 0 40px; text-align: center; }
    .page-desc { color: var(--text-secondary); max-width: 560px; margin: 12px auto 0; }
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1.5fr;
      gap: 32px;
      align-items: start;
    }
    @media (max-width: 768px) {
      .contact-grid { grid-template-columns: 1fr; }
    }
    .info-item {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 24px;
    }
    .info-icon {
      width: 44px;
      height: 44px;
      border-radius: var(--radius-md);
      background: var(--accent-gradient-soft);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--accent-primary);
      font-size: 1.125rem;
      flex-shrink: 0;
    }
    .info-label {
      font-size: 0.8125rem;
      color: var(--text-muted);
      margin-bottom: 4px;
    }
    .info-value {
      font-weight: 500;
      color: var(--text-primary);
    }
    .social-section { margin-top: 32px; padding-top: 24px; border-top: 1px solid var(--border-subtle); }
    .social-links {
      display: flex;
      gap: 10px;
      a {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background: var(--bg-card);
        border: 1px solid var(--border-subtle);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-secondary);
        transition: all var(--transition-base);
        &:hover {
          background: var(--accent-primary);
          border-color: var(--accent-primary);
          color: var(--text-inverse);
          transform: translateY(-2px);
        }
      }
    }
    .form-row {
      display: flex;
      gap: 16px;
    }
    @media (max-width: 480px) {
      .form-row { flex-direction: column; gap: 0; }
    }
  `]
})
export class ContactPageComponent {
  contactForm: FormGroup;
  loading = false;
  success = '';
  error = '';

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      company: [''],
      message: ['', Validators.required]
    });
  }

  get f() { return this.contactForm.controls; }

  onSubmit() {
    if (this.contactForm.invalid) return;
    this.loading = true;
    this.success = '';
    this.error = '';

    this.contactService.submit(this.contactForm.value).subscribe({
      next: () => {
        this.success = 'Thank you! Your message has been sent successfully.';
        this.contactForm.reset();
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.error || 'Failed to send message. Please try again.';
        this.loading = false;
      }
    });
  }
}
