import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../../services/project.service';
import { Project } from '../../../../models/project.model';

@Component({
  selector: 'app-project-detail',
  template: `
    <section class="page-header">
      <div class="container">
        <div class="page-header-content">
          <a routerLink="/projects" class="back-link"><i class="fas fa-arrow-left"></i> Back to Projects</a>
          <div *ngIf="project">
            <div class="section-label" style="margin-top:16px">Project Details</div>
            <h1 class="heading-lg">{{project.title}}</h1>
          </div>
        </div>
      </div>
    </section>

    <section class="section" *ngIf="project">
      <div class="container">
        <div class="detail-card glass-card">
          <div class="detail-meta">
            <div class="detail-tech">
              <span class="tech-tag" *ngFor="let tech of splitTech(project.technologies)">{{tech}}</span>
            </div>
          </div>
          <div class="detail-body">
            <h3>Description</h3>
            <p>{{project.description}}</p>

            <h3 *ngIf="project.businessImpact">Business Impact</h3>
            <p *ngIf="project.businessImpact" style="color:var(--accent-primary)">
              <i class="fas fa-chart-line"></i> {{project.businessImpact}}
            </p>
          </div>
          <div class="detail-actions">
            <a *ngIf="project.githubUrl" [href]="project.githubUrl" target="_blank" class="btn btn-primary">
              <i class="fab fa-github"></i> View Source Code
            </a>
            <a *ngIf="project.liveUrl" [href]="project.liveUrl" target="_blank" class="btn btn-secondary">
              <i class="fas fa-external-link-alt"></i> Live Demo
            </a>
          </div>
        </div>
      </div>
    </section>

    <div *ngIf="!project && !loading" class="text-center" style="padding:120px 0">
      <i class="fas fa-exclamation-circle" style="font-size:3rem;color:var(--text-muted);margin-bottom:16px;display:block"></i>
      <p style="color:var(--text-muted)">Project not found.</p>
      <a routerLink="/projects" class="btn btn-secondary" style="margin-top:16px">View All Projects</a>
    </div>
  `,
  styles: [`
    .page-header { padding: 120px 0 20px; }
    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: var(--text-secondary);
      font-size: 0.875rem;
      margin-bottom: 8px;
      &:hover { color: var(--accent-primary); }
    }
    .detail-card {
      max-width: 800px;
      margin: 0 auto;
    }
    .detail-meta {
      margin-bottom: 24px;
      .detail-tech {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
    }
    .detail-body {
      h3 {
        font-size: 1.125rem;
        font-weight: 600;
        margin: 24px 0 12px;
        color: var(--text-primary);
      }
      p {
        color: var(--text-secondary);
        line-height: 1.7;
      }
    }
    .detail-actions {
      display: flex;
      gap: 12px;
      margin-top: 32px;
      flex-wrap: wrap;
    }
  `]
})
export class ProjectDetailComponent implements OnInit {
  project: Project | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.projectService.getById(id).subscribe({
      next: (data) => { this.project = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  splitTech(tech: string): string[] {
    return tech.split(/[,;]/).map(t => t.trim()).filter(t => t);
  }
}
