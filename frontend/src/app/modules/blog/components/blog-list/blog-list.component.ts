import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { BlogService } from '../../../../services/blog.service';
import { Blog } from '../../../../models/blog.model';

@Component({
  selector: 'app-blog-list',
  template: `
    <section class="page-header">
      <div class="container">
        <div class="page-header-content reveal">
          <div class="section-label">Blog</div>
          <h1 class="heading-lg">Latest <span class="text-gradient">Articles</span></h1>
          <p class="page-desc">Insights on Java, architecture, microservices, and full-stack development.</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="blog-categories reveal">
          <button
            *ngFor="let cat of categories"
            class="category-tab"
            [class.active]="selectedCategory === cat"
            (click)="filterByCategory(cat)"
          >{{cat}}</button>
        </div>

        <div *ngIf="loading" class="flex-center" style="padding:60px 0">
          <div class="spinner"></div>
        </div>

        <div *ngIf="!loading && filteredBlogs.length === 0" class="text-center" style="padding:60px 0">
          <i class="fas fa-newspaper" style="font-size:3rem;color:var(--text-muted);margin-bottom:16px;display:block"></i>
          <p style="color:var(--text-muted)">No articles found.</p>
        </div>

        <div class="grid grid-3" *ngIf="!loading">
          <div class="blog-card reveal" *ngFor="let blog of filteredBlogs; let i = index" [style.transition-delay]="i * 80 + 'ms'">
            <div class="blog-meta">
              <span class="blog-category">{{blog.category}}</span>
              <span>{{formatDate(blog.createdAt)}}</span>
            </div>
            <h3 class="blog-title">{{blog.title}}</h3>
            <p class="blog-excerpt">{{blog.content | slice:0:180}}...</p>
            <div class="blog-tags" *ngIf="blog.tags">
              <span class="tag" *ngFor="let tag of splitTags(blog.tags).slice(0,3)">{{tag}}</span>
            </div>
            <a class="read-more" [routerLink]="['/blog', blog.id]">Read Article <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-header { padding: 120px 0 40px; text-align: center; }
    .page-desc { color: var(--text-secondary); max-width: 560px; margin: 12px auto 0; }
    .blog-categories {
      display: flex;
      gap: 8px;
      justify-content: center;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }
    .category-tab {
      padding: 8px 18px;
      border-radius: var(--radius-md);
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      font-family: var(--font-sans);
      font-size: 0.875rem;
      cursor: pointer;
      transition: all var(--transition-base);
      &:hover { border-color: var(--border-hover); color: var(--text-primary); }
      &.active {
        background: var(--accent-gradient);
        border-color: transparent;
        color: var(--text-inverse);
        box-shadow: 0 4px 16px rgba(0, 212, 170, 0.3);
      }
    }
  `]
})
export class BlogListComponent implements OnInit, OnDestroy {
  blogs: Blog[] = [];
  filteredBlogs: Blog[] = [];
  loading = true;
  categories = ['All', 'Java', 'Spring', 'Angular', 'Architecture', 'DevOps', 'Cloud'];
  selectedCategory = 'All';
  private sub!: Subscription;

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.sub = this.blogService.getAll().subscribe({
      next: (data) => {
        this.blogs = data;
        this.filteredBlogs = data;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
    setTimeout(() => this.setupScrollReveal(), 100);
  }

  ngOnDestroy() { this.sub?.unsubscribe(); }

  filterByCategory(cat: string) {
    this.selectedCategory = cat;
    if (cat === 'All') {
      this.filteredBlogs = this.blogs;
    } else {
      this.sub = this.blogService.getByCategory(cat).subscribe({
        next: (data) => { this.filteredBlogs = data; }
      });
    }
  }

  splitTags(tags: string): string[] {
    return tags.split(/[,;]/).map(t => t.trim()).filter(t => t);
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
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
