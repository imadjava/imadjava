import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <div class="admin-layout">
      <nav class="sidebar">
        <h3>Admin Panel</h3>
        <ul>
          <li><a routerLink="experiences">Experiences</a></li>
          <li><a routerLink="projects">Projects</a></li>
          <li><a routerLink="skills">Skills</a></li>
        </ul>
        <button (click)="logout()" class="logout-btn">Logout</button>
      </nav>
      <main class="content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .admin-layout { display: flex; min-height: 100vh; }
    .sidebar { width: 250px; background: var(--surface); padding: 20px; border-right: 1px solid #333; }
    .sidebar h3 { color: var(--primary); }
    .sidebar ul { list-style: none; padding: 0; }
    .sidebar li { margin: 10px 0; }
    .sidebar a { color: var(--text); text-decoration: none; }
    .sidebar a:hover { color: var(--primary); }
    .content { flex: 1; padding: 20px; }
    .logout-btn { width: 100%; padding: 10px; background: var(--primary); color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 20px; }
  `]
})
export class AdminDashboardComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

