import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="auth-container">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <h2>Admin Login</h2>
        <div *ngIf="error" class="error">{{ error }}</div>
        <input type="text" formControlName="username" placeholder="Username" class="form-control">
        <input type="password" formControlName="password" placeholder="Password" class="form-control">
        <button type="submit" class="btn-primary">Login</button>
      </form>
    </div>
  `,
  styles: [`
    .auth-container { max-width: 400px; margin: 50px auto; padding: 30px; }
    h2 { text-align: center; }
    .form-control { width: 100%; padding: 8px; margin: 10px 0; border: 1px solid #ddd; }
    .btn-primary { width: 100%; padding: 10px; background: var(--primary); color: white; border: none; }
    .error { color: red; }
  `]
})
export class LoginComponent {
  form: FormGroup;
  error: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (!this.form.valid) return;
    this.authService.login(this.form.value.username, this.form.value.password).subscribe({
      next: () => this.router.navigate(['/admin']),
      error: () => this.error = 'Invalid credentials'
    });
  }
}

