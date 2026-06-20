import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectService } from '../../../../services/project.service';
import { Project } from '../../../../models/project.model';

@Component({
  selector: 'app-project-list',
  template: `
    <section class="page-header">
      <div class="container">
        <div class="page-header-content reveal">
          <div class="section-label">Portfolio</div>
          <h1 class="heading-lg">All <span class="text-gradient">Projects</span></h1>
          <p class="page-desc">A complete collection of projects showcasing architecture, design patterns, and technical expertise.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div *ngIf="loading" class="flex-center" style="padding:60px 0">
          <div class="spinner"></div>
        </div>

        <div *ngIf="!loading && projects.length === 0" class="text-center" style="padding:60px 0">
          <i class="fas fa-folder-open" style="font-size:3rem;color:var(--text-muted);margin-bottom:16px;display:block"></i>
          <p style="color:var(--text-muted)">No projects yet. Check back soon!</p>
        </div>

        <div class="grid grid-3" *ngIf="!loading">
          <div class="project-card reveal" *ngFor="let project of projects; let i = index" [style.transition-delay]="i * 80 + 'ms'">
            <div class="project-image">
              <span class="project-icon"><i class="fas fa-code"></i></span>
              <div class="project-links">
                <a *ngIf="project.githubUrl" [href]="project.githubUrl" target="_blank" title="View Code"><i class="fab fa-github"></i></a>
                <a *ngIf="project.liveUrl" [href]="project.liveUrl" target="_blank" title="Live Demo"><i class="fas fa-external-link-alt"></i></a>
                <a [routerLink]="['/projects', project.id]" title="View Details"><i class="fas fa-eye"></i></a>
              </div>
            </div>
            <div class="project-content">
              <h3 class="project-title">{{project.title}}</h3>
              <p class="project-desc">{{project.description}}</p>
              <div class="project-tech" *ngIf="project.technologies">
                <span class="tech-tag" *ngFor="let tech of splitTech(project.technologies)">{{tech}}</span>
              </div>
              <a [routerLink]="['/projects', project.id]" class="read-more" style="margin-top:12px;display:inline-flex">
                View Details <i class="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-header {
      padding: 120px 0 40px;
      text-align: center;
    }
    .page-desc {
      color: var(--text-secondary);
      max-width: 560px;
      margin: 12px auto 0;
    }
    .read-more {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--accent-primary);
      display: inline-flex;
      align-items: center;
      gap: 4px;
      &:hover { gap: 8px; }
    }
  `]
})
export class ProjectListComponent implements OnInit, OnDestroy {
  projects: Project[] = [];
  loading = true;
  private sub!: Subscription;

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.sub = this.projectService.getAll().subscribe({
      next: (data) => { this.projects = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
    setTimeout(() => this.setupScrollReveal(), 100);
  }

  ngOnDestroy() { this.sub?.unsubscribe(); }

  splitTech(tech: string): string[] {
    return tech.split(/[,;]/).map(t => t.trim()).filter(t => t);
  }

  @HostListener('window:scroll')
  setupScrollReveal() {
    document.querySelectorAll('.reveal').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 100) {
        el.classList.add('revealed');
      }
    });
  }
}
