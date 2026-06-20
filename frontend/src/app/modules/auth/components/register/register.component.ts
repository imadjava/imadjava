import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-register',
  template: `
    <div class="auth-page">
      <div class="auth-bg">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
      </div>
      <div class="auth-card">
        <div class="auth-header">
          <div class="auth-logo">Dev<span>Portfolio</span></div>
          <h1 class="auth-title">Create Account</h1>
          <p class="auth-subtitle">Register to manage your portfolio content</p>
        </div>

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label class="form-label">Username</label>
            <input type="text" class="form-input" formControlName="username" placeholder="Choose a username">
            <div class="form-error" *ngIf="registerForm.get('username')?.invalid && registerForm.get('username')?.touched">
              Username is required
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Password</label>
            <div class="password-field">
              <input [type]="showPassword ? 'text' : 'password'" class="form-input" formControlName="password" placeholder="Choose a password (min 6 chars)">
              <button type="button" class="password-toggle" (click)="showPassword = !showPassword">
                <i class="fas" [class.fa-eye]="!showPassword" [class.fa-eye-slash]="showPassword"></i>
              </button>
            </div>
            <div class="form-error" *ngIf="registerForm.get('password')?.invalid && registerForm.get('password')?.touched">
              Password must be at least 6 characters
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Confirm Password</label>
            <input type="password" class="form-input" formControlName="confirmPassword" placeholder="Confirm your password">
            <div class="form-error" *ngIf="registerForm.hasError('mismatch') && registerForm.get('confirmPassword')?.touched">
              Passwords do not match
            </div>
          </div>

          <div class="form-error text-center" *ngIf="error">{{error}}</div>
          <div class="form-success text-center" *ngIf="success" style="color:var(--success);margin-bottom:16px">{{success}}</div>

          <button type="submit" class="btn btn-primary w-full" [disabled]="registerForm.invalid || loading">
            <span *ngIf="!loading">Create Account</span>
            <div class="spinner" style="width:20px;height:20px;border-width:2px;margin:0 auto" *ngIf="loading"></div>
          </button>
        </form>

        <div class="auth-footer">
          <p>Already have an account? <a routerLink="/auth/login">Sign In</a></p>
          <a routerLink="/">&larr; Back to Portfolio</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      position: relative;
      overflow: hidden;
    }
    .auth-bg {
      position: absolute;
      inset: 0;
      z-index: 0;
      .orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(80px);
        opacity: 0.3;
      }
      .orb-1 {
        width: 300px; height: 300px;
        background: rgba(0, 212, 170, 0.2);
        top: -100px; right: -100px;
      }
      .orb-2 {
        width: 250px; height: 250px;
        background: rgba(124, 58, 237, 0.2);
        bottom: -80px; left: -80px;
      }
    }
    .auth-card {
      position: relative;
      z-index: 1;
      background: var(--bg-secondary);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-xl);
      padding: 48px;
      width: 100%;
      max-width: 440px;
      box-shadow: var(--shadow-lg);
    }
    .auth-header {
      text-align: center;
      margin-bottom: 32px;
      .auth-logo {
        font-size: 1.5rem;
        font-weight: 800;
        margin-bottom: 24px;
        color: var(--text-primary);
        span {
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      }
      .auth-title {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 8px;
      }
      .auth-subtitle {
        color: var(--text-secondary);
        font-size: 0.875rem;
      }
    }
    .password-field {
      position: relative;
      .password-toggle {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: var(--text-muted);
        cursor: pointer;
        padding: 4px;
        &:hover { color: var(--text-primary); }
      }
    }
    .auth-footer {
      margin-top: 24px;
      text-align: center;
      p {
        color: var(--text-secondary);
        font-size: 0.875rem;
        margin-bottom: 12px;
      }
      a {
        color: var(--accent-primary);
        font-size: 0.875rem;
        &:hover { text-decoration: underline; }
      }
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  error = '';
  success = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) return;
    this.loading = true;
    this.error = '';
    this.success = '';

    const { username, password } = this.registerForm.value;
    this.authService.register(username, password).subscribe({
      next: () => {
        this.success = 'Account created successfully! Redirecting to login...';
        this.loading = false;
        setTimeout(() => this.router.navigate(['/auth/login']), 2000);
      },
      error: (err) => {
        this.error = err.error?.error || 'Registration failed. Please try again.';
        this.loading = false;
      }
    });
  }
}
