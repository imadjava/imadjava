import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <!-- Navigation -->
      <nav class="navbar" [class.scrolled]="isScrolled">
        <div class="nav-container">
          <a routerLink="/" class="nav-brand">Dev<span>Portfolio</span></a>

          <ul class="nav-links" [class.open]="mobileMenuOpen">
            <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" (click)="mobileMenuOpen = false">Home</a></li>
            <li><a routerLink="/projects" routerLinkActive="active" (click)="mobileMenuOpen = false">Projects</a></li>
            <li><a routerLink="/blog" routerLinkActive="active" (click)="mobileMenuOpen = false">Blog</a></li>
            <li><a routerLink="/contact" routerLinkActive="active" (click)="mobileMenuOpen = false">Contact</a></li>
            <li *ngIf="isAdmin"><a routerLink="/admin" routerLinkActive="active" (click)="mobileMenuOpen = false">Dashboard</a></li>
          </ul>

          <div class="nav-actions">
            <ng-container *ngIf="!isAuthenticated; else loggedIn">
              <a routerLink="/auth/login" class="btn btn-sm btn-secondary sm-hidden">Sign In</a>
            </ng-container>
            <ng-template #loggedIn>
              <button class="btn btn-sm btn-secondary sm-hidden" (click)="logout()">
                <i class="fas fa-sign-out-alt"></i> Sign Out
              </button>
            </ng-template>
            <button class="mobile-menu-btn" (click)="mobileMenuOpen = !mobileMenuOpen">
              <i class="fas" [class.fa-bars]="!mobileMenuOpen" [class.fa-times]="mobileMenuOpen" style="font-size:1.25rem"></i>
            </button>
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>

      <!-- Footer -->
      <footer class="app-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <div class="footer-logo">Dev<span>Portfolio</span></div>
              <p class="footer-desc">Senior Java Full Stack Developer crafting scalable, high-performance applications with modern technologies.</p>
              <div class="social-links">
                <a href="https://github.com" target="_blank" aria-label="GitHub"><i class="fab fa-github"></i></a>
                <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
                <a href="https://twitter.com" target="_blank" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                <a href="https://stackoverflow.com" target="_blank" aria-label="Stack Overflow"><i class="fab fa-stack-overflow"></i></a>
              </div>
            </div>

            <div class="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><a routerLink="/">Home</a></li>
                <li><a routerLink="/projects">Projects</a></li>
                <li><a routerLink="/blog">Blog</a></li>
                <li><a routerLink="/contact">Contact</a></li>
              </ul>
            </div>

            <div class="footer-links">
              <h4>Technologies</h4>
              <ul>
                <li><span>Java & Spring Boot</span></li>
                <li><span>Angular & TypeScript</span></li>
                <li><span>Docker & Kubernetes</span></li>
                <li><span>AWS & Cloud</span></li>
              </ul>
            </div>

            <div class="footer-contact">
              <h4>Get In Touch</h4>
              <p><i class="fas fa-envelope"></i> contact&#64;devportfolio.com</p>
              <p><i class="fas fa-map-marker-alt"></i> San Francisco, CA</p>
            </div>
          </div>

          <div class="footer-bottom">
            <p>&copy; {{currentYear}} Senior Java Full Stack Developer. All rights reserved.</p>
            <p class="footer-credit">Built with <i class="fas fa-heart" style="color:var(--danger)"></i> using Java, Spring Boot & Angular</p>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .main-content {
      flex: 1;
      padding-top: 64px;
    }

    /* Footer Styles */
    .app-footer {
      background: var(--bg-secondary);
      border-top: 1px solid var(--border-subtle);
      padding: 60px 0 24px;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1.5fr;
      gap: 48px;
      margin-bottom: 48px;
    }

    @media (max-width: 768px) {
      .footer-grid {
        grid-template-columns: 1fr 1fr;
        gap: 32px;
      }
    }
    @media (max-width: 480px) {
      .footer-grid {
        grid-template-columns: 1fr;
      }
    }

    .footer-logo {
      font-size: 1.5rem;
      font-weight: 800;
      margin-bottom: 16px;
      color: var(--text-primary);

      span {
        background: var(--accent-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    }

    .footer-desc {
      color: var(--text-secondary);
      font-size: 0.875rem;
      line-height: 1.7;
      margin-bottom: 20px;
    }

    .social-links {
      display: flex;
      gap: 12px;

      a {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--bg-card);
        border: 1px solid var(--border-subtle);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-secondary);
        transition: all 0.3s ease;

        &:hover {
          background: var(--accent-primary);
          border-color: var(--accent-primary);
          color: var(--text-inverse);
          transform: translateY(-3px);
        }
      }
    }

    .footer-links, .footer-contact {
      h4 {
        font-size: 0.9375rem;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 20px;
      }

      ul {
        list-style: none;
      }

      li {
        margin-bottom: 10px;
      }

      a, span {
        color: var(--text-secondary);
        font-size: 0.875rem;
        transition: color 0.2s ease;
      }

      a:hover {
        color: var(--accent-primary);
      }

      p {
        color: var(--text-secondary);
        font-size: 0.875rem;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        gap: 10px;

        i {
          color: var(--accent-primary);
          width: 16px;
        }
      }
    }

    .footer-bottom {
      border-top: 1px solid var(--border-subtle);
      padding-top: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;

      p {
        color: var(--text-muted);
        font-size: 0.8125rem;
      }

      .footer-credit {
        display: flex;
        align-items: center;
        gap: 6px;
      }
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  isScrolled = false;
  mobileMenuOpen = false;
  isAuthenticated = false;
  isAdmin = false;
  currentYear = new Date().getFullYear();

  private authSub!: Subscription;
  private routerSub!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Scroll listener
    this.checkScroll();

    // Auth state
    this.authSub = this.authService.isAuthenticated$.subscribe(auth => {
      this.isAuthenticated = auth;
      this.isAdmin = auth; // Admin if authenticated (single admin role)
    });

    // Close mobile menu on route change
    this.routerSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.mobileMenuOpen = false;
        window.scrollTo(0, 0);
      });
  }

  ngOnDestroy() {
    this.authSub?.unsubscribe();
    this.routerSub?.unsubscribe();
  }

  @HostListener('window:scroll')
  checkScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
