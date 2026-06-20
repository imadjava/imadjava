import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="auth-page">
      <div class="auth-bg">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
      </div>
      <div class="auth-card">
        <div class="auth-header">
          <div class="auth-logo">Dev<span>Portfolio</span></div>
          <h1 class="auth-title">Welcome Back</h1>
          <p class="auth-subtitle">Sign in to access your admin dashboard</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label class="form-label">Username</label>
            <input type="text" class="form-input" formControlName="username" placeholder="Enter your username">
            <div class="form-error" *ngIf="loginForm.get('username')?.invalid && loginForm.get('username')?.touched">
              Username is required
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Password</label>
            <div class="password-field">
              <input [type]="showPassword ? 'text' : 'password'" class="form-input" formControlName="password" placeholder="Enter your password">
              <button type="button" class="password-toggle" (click)="showPassword = !showPassword">
                <i class="fas" [class.fa-eye]="!showPassword" [class.fa-eye-slash]="showPassword"></i>
              </button>
            </div>
            <div class="form-error" *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
              Password is required (min 6 characters)
            </div>
          </div>

          <div class="form-error text-center" *ngIf="error">{{error}}</div>

          <button type="submit" class="btn btn-primary w-full" [disabled]="loginForm.invalid || loading">
            <span *ngIf="!loading">Sign In</span>
            <div class="spinner" style="width:20px;height:20px;border-width:2px;margin:0 auto" *ngIf="loading"></div>
          </button>
        </form>

        <div class="auth-footer">
          <p>Don't have an account? <a routerLink="/auth/register">Register</a></p>
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
        top: -100px; left: -100px;
      }
      .orb-2 {
        width: 250px; height: 250px;
        background: rgba(124, 58, 237, 0.2);
        bottom: -80px; right: -80px;
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
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.error = '';

    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
        this.router.navigateByUrl(returnUrl);
      },
      error: (err) => {
        this.error = err.error?.error || 'Invalid credentials. Please try again.';
        this.loading = false;
      }
    });
  }
}
