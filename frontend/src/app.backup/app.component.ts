import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <nav class="navbar">
        <div class="nav-brand">Portfolio</div>
        <ul class="nav-menu">
          <li><a routerLink="/">Home</a></li>
          <li><a routerLink="/projects">Projects</a></li>
          <li><a routerLink="/blog">Blog</a></li>
          <li><a routerLink="/contact">Contact</a></li>
          <li><a routerLink="/auth/login" class="admin-link">Admin</a></li>
        </ul>
      </nav>
      <router-outlet></router-outlet>
      <footer class="app-footer">
        <p>&copy; 2026 Senior Java Full Stack Developer. All rights reserved.</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container { display: flex; flex-direction: column; min-height: 100vh; }
    .navbar { background: var(--surface); padding: 15px 30px; border-bottom: 1px solid #333; display: flex; justify-content: space-between; align-items: center; }
    .nav-brand { font-size: 1.5rem; color: var(--primary); font-weight: bold; }
    .nav-menu { list-style: none; display: flex; gap: 30px; }
    .nav-menu a { color: var(--text); text-decoration: none; }
    .nav-menu a:hover { color: var(--primary); }
    .admin-link { color: var(--primary); font-weight: bold; }
    router-outlet { flex: 1; }
    .app-footer { background: var(--surface); padding: 20px; text-align: center; border-top: 1px solid #333; }
  `]
})
export class AppComponent { }

