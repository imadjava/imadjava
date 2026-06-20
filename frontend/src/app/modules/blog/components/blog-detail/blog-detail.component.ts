import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../../../services/blog.service';
import { Blog } from '../../../../models/blog.model';

@Component({
  selector: 'app-blog-detail',
  template: `
    <section class="page-header">
      <div class="container">
        <div class="page-header-content">
          <a routerLink="/blog" class="back-link"><i class="fas fa-arrow-left"></i> Back to Blog</a>
        </div>
      </div>
    </section>

    <section class="section" *ngIf="blog">
      <div class="container">
        <article class="blog-article glass-card">
          <div class="blog-article-meta">
            <span class="badge badge-primary">{{blog.category}}</span>
            <span class="blog-date"><i class="far fa-calendar"></i> {{formatDate(blog.createdAt)}}</span>
            <span class="blog-date" *ngIf="blog.updatedAt !== blog.createdAt"><i class="far fa-edit"></i> Updated {{formatDate(blog.updatedAt)}}</span>
          </div>
          <h1 class="blog-article-title">{{blog.title}}</h1>
          <div class="blog-tags" *ngIf="blog.tags">
            <span class="tag" *ngFor="let tag of splitTags(blog.tags)">{{tag}}</span>
          </div>
          <div class="blog-article-body">
            <p>{{blog.content}}</p>
          </div>
        </article>
      </div>
    </section>

    <div *ngIf="!blog && !loading" class="text-center" style="padding:120px 0">
      <i class="fas fa-exclamation-circle" style="font-size:3rem;color:var(--text-muted);margin-bottom:16px;display:block"></i>
      <p style="color:var(--text-muted)">Article not found.</p>
      <a routerLink="/blog" class="btn btn-secondary" style="margin-top:16px">View All Articles</a>
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
      &:hover { color: var(--accent-primary); }
    }
    .blog-article {
      max-width: 800px;
      margin: 0 auto;
      padding: 48px;
    }
    .blog-article-meta {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }
    .blog-date {
      color: var(--text-muted);
      font-size: 0.875rem;
      font-family: var(--font-mono);
      i { margin-right: 6px; }
    }
    .blog-article-title {
      font-size: clamp(1.5rem, 3vw, 2.25rem);
      font-weight: 700;
      line-height: 1.3;
      margin-bottom: 16px;
    }
    .blog-article-body {
      margin-top: 32px;
      padding-top: 32px;
      border-top: 1px solid var(--border-subtle);
      p {
        color: var(--text-secondary);
        line-height: 1.9;
        font-size: 1.0625rem;
        white-space: pre-wrap;
      }
    }
  `]
})
export class BlogDetailComponent implements OnInit {
  blog: Blog | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.blogService.getById(id).subscribe({
      next: (data) => { this.blog = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  splitTags(tags: string): string[] {
    return tags.split(/[,;]/).map(t => t.trim()).filter(t => t);
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}
