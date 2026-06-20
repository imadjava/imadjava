import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExperienceService } from '../../../../services/experience.service';
import { ProjectService } from '../../../../services/project.service';
import { SkillService } from '../../../../services/skill.service';
import { CertificationService } from '../../../../services/certification.service';
import { BlogService } from '../../../../services/blog.service';
import { CaseStudyService } from '../../../../services/case-study.service';
import { TestimonialService } from '../../../../services/testimonial.service';
import { ContactService } from '../../../../services/contact.service';
import { Experience } from '../../../../models/experience.model';
import { Project } from '../../../../models/project.model';
import { Skill } from '../../../../models/skill.model';
import { Certification } from '../../../../models/certification.model';
import { Blog } from '../../../../models/blog.model';
import { CaseStudy } from '../../../../models/case-study.model';
import { Testimonial } from '../../../../models/testimonial.model';
import { ContactRequest } from '../../../../models/contact-request.model';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

type Section = 'experiences' | 'projects' | 'skills' | 'certifications' | 'blogs' | 'case-studies' | 'testimonials' | 'contacts';
type ModalType = Section | null;

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="admin-layout">
      <!-- Sidebar -->
      <aside class="admin-sidebar">
        <div class="sidebar-brand">
          <div class="nav-brand">Dev<span>Portfolio</span></div>
          <span class="admin-badge">ADMIN</span>
        </div>
        <nav class="sidebar-nav">
          <button *ngFor="let item of navItems"
                  class="sidebar-link"
                  [class.active]="activeSection === item.section"
                  (click)="activeSection = item.section">
            <i class="fas" [class]="item.icon"></i>
            <span>{{item.label}}</span>
            <span class="sidebar-count" *ngIf="getCount(item.section) > 0">{{getCount(item.section)}}</span>
          </button>
        </nav>
        <div class="sidebar-footer">
          <a routerLink="/" class="sidebar-link"><i class="fas fa-arrow-left"></i> Back to Site</a>
          <button class="sidebar-link" (click)="logout()"><i class="fas fa-sign-out-alt"></i> Sign Out</button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="admin-main">
        <!-- Header -->
        <header class="admin-header">
          <h1>{{getSectionTitle()}}</h1>
          <button *ngIf="activeSection !== 'contacts'" class="btn btn-primary btn-sm" (click)="openAddModal()">
            <i class="fas fa-plus"></i> Add {{getSingularTitle()}}
          </button>
        </header>

        <!-- Stats Cards -->
        <div class="stats-row" *ngIf="activeSection !== 'contacts'">
          <div class="stat-card" *ngFor="let stat of sectionStats">
            <div class="stat-card-value">{{stat.value}}</div>
            <div class="stat-card-label">{{stat.label}}</div>
          </div>
        </div>

        <!-- Content -->
        <div class="admin-content">
          <!-- Loading -->
          <div *ngIf="loading" class="flex-center" style="padding:60px">
            <div class="spinner"></div>
          </div>

          <!-- EXPERIENCES -->
          <ng-container *ngIf="activeSection === 'experiences' && !loading">
            <div class="table-wrapper">
              <table class="data-table" *ngIf="experiences.length > 0">
                <thead><tr><th>Company</th><th>Designation</th><th>Period</th><th>Responsibilities</th><th width="120">Actions</th></tr></thead>
                <tbody>
                  <tr *ngFor="let item of experiences">
                    <td><strong>{{item.companyName}}</strong></td>
                    <td>{{item.designation}}</td>
                    <td>{{formatDate(item.startDate)}} - {{item.endDate ? formatDate(item.endDate) : 'Present'}}</td>
                    <td>{{item.responsibilities | slice:0:80}}...</td>
                    <td>
                      <button class="action-btn edit" (click)="openEditModal('experiences', item)" title="Edit"><i class="fas fa-edit"></i></button>
                      <button class="action-btn delete" (click)="deleteItem('experiences', item.id)" title="Delete"><i class="fas fa-trash"></i></button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div *ngIf="experiences.length === 0" class="empty-state">
                <i class="fas fa-briefcase"></i>
                <p>No experiences added yet.</p>
              </div>
            </div>
          </ng-container>

          <!-- PROJECTS -->
          <ng-container *ngIf="activeSection === 'projects' && !loading">
            <div class="table-wrapper">
              <table class="data-table" *ngIf="projects.length > 0">
                <thead><tr><th>Title</th><th>Technologies</th><th>Links</th><th width="120">Actions</th></tr></thead>
                <tbody>
                  <tr *ngFor="let item of projects">
                    <td><strong>{{item.title}}</strong><br><small style="color:var(--text-muted)">{{item.description | slice:0:60}}...</small></td>
                    <td><span class="tech-tag" *ngFor="let t of splitTech(item.technologies).slice(0,3)">{{t}}</span></td>
                    <td>
                      <a *ngIf="item.githubUrl" [href]="item.githubUrl" target="_blank" title="GitHub"><i class="fab fa-github"></i></a>
                      <a *ngIf="item.liveUrl" [href]="item.liveUrl" target="_blank" title="Live" style="margin-left:8px"><i class="fas fa-external-link-alt"></i></a>
                    </td>
                    <td>
                      <button class="action-btn edit" (click)="openEditModal('projects', item)" title="Edit"><i class="fas fa-edit"></i></button>
                      <button class="action-btn delete" (click)="deleteItem('projects', item.id)" title="Delete"><i class="fas fa-trash"></i></button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div *ngIf="projects.length === 0" class="empty-state"><i class="fas fa-code"></i><p>No projects added yet.</p></div>
            </div>
          </ng-container>

          <!-- SKILLS -->
          <ng-container *ngIf="activeSection === 'skills' && !loading">
            <div class="table-wrapper">
              <table class="data-table" *ngIf="skills.length > 0">
                <thead><tr><th>Name</th><th>Category</th><th>Proficiency</th><th width="120">Actions</th></tr></thead>
                <tbody>
                  <tr *ngFor="let item of skills">
                    <td><strong>{{item.name}}</strong></td>
                    <td><span class="badge badge-secondary">{{item.category}}</span></td>
                    <td>
                      <div class="skill-track" style="max-width:200px"><div class="skill-fill" [style.width.%]="(item.proficiency/5)*100"></div></div>
                      <small style="color:var(--text-muted)">{{item.proficiency}}/5</small>
                    </td>
                    <td>
                      <button class="action-btn edit" (click)="openEditModal('skills', item)" title="Edit"><i class="fas fa-edit"></i></button>
                      <button class="action-btn delete" (click)="deleteItem('skills', item.id)" title="Delete"><i class="fas fa-trash"></i></button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div *ngIf="skills.length === 0" class="empty-state"><i class="fas fa-cogs"></i><p>No skills added yet.</p></div>
            </div>
          </ng-container>

          <!-- CERTIFICATIONS -->
          <ng-container *ngIf="activeSection === 'certifications' && !loading">
            <div class="table-wrapper">
              <table class="data-table" *ngIf="certifications.length > 0">
                <thead><tr><th>Name</th><th>Provider</th><th>Issue Date</th><th>Credential</th><th width="120">Actions</th></tr></thead>
                <tbody>
                  <tr *ngFor="let item of certifications">
                    <td><strong>{{item.name}}</strong></td>
                    <td>{{item.provider}}</td>
                    <td>{{formatDate(item.issueDate)}}</td>
                    <td><a *ngIf="item.credentialUrl" [href]="item.credentialUrl" target="_blank"><i class="fas fa-external-link-alt"></i> Verify</a><span *ngIf="!item.credentialUrl" style="color:var(--text-muted)">-</span></td>
                    <td>
                      <button class="action-btn edit" (click)="openEditModal('certifications', item)" title="Edit"><i class="fas fa-edit"></i></button>
                      <button class="action-btn delete" (click)="deleteItem('certifications', item.id)" title="Delete"><i class="fas fa-trash"></i></button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div *ngIf="certifications.length === 0" class="empty-state"><i class="fas fa-certificate"></i><p>No certifications added yet.</p></div>
            </div>
          </ng-container>

          <!-- BLOGS -->
          <ng-container *ngIf="activeSection === 'blogs' && !loading">
            <div class="table-wrapper">
              <table class="data-table" *ngIf="blogs.length > 0">
                <thead><tr><th>Title</th><th>Category</th><th>Tags</th><th>Date</th><th width="120">Actions</th></tr></thead>
                <tbody>
                  <tr *ngFor="let item of blogs">
                    <td><strong>{{item.title}}</strong></td>
                    <td><span class="badge badge-primary">{{item.category}}</span></td>
                    <td><span class="tag" *ngFor="let t of splitTags(item.tags).slice(0,3)">{{t}}</span></td>
                    <td>{{formatDate(item.createdAt)}}</td>
                    <td>
                      <button class="action-btn edit" (click)="openEditModal('blogs', item)" title="Edit"><i class="fas fa-edit"></i></button>
                      <button class="action-btn delete" (click)="deleteItem('blogs', item.id)" title="Delete"><i class="fas fa-trash"></i></button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div *ngIf="blogs.length === 0" class="empty-state"><i class="fas fa-newspaper"></i><p>No articles added yet.</p></div>
            </div>
          </ng-container>

          <!-- CASE STUDIES -->
          <ng-container *ngIf="activeSection === 'case-studies' && !loading">
            <div class="table-wrapper">
              <table class="data-table" *ngIf="caseStudies.length > 0">
                <thead><tr><th>Title</th><th>Industry</th><th>Technologies</th><th width="120">Actions</th></tr></thead>
                <tbody>
                  <tr *ngFor="let item of caseStudies">
                    <td><strong>{{item.title}}</strong></td>
                    <td><span class="badge badge-secondary">{{item.industry}}</span></td>
                    <td><span class="tech-tag" *ngFor="let t of splitTech(item.technologiesUsed||'').slice(0,3)">{{t}}</span></td>
                    <td>
                      <button class="action-btn edit" (click)="openEditModal('case-studies', item)" title="Edit"><i class="fas fa-edit"></i></button>
                      <button class="action-btn delete" (click)="deleteItem('case-studies', item.id)" title="Delete"><i class="fas fa-trash"></i></button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div *ngIf="caseStudies.length === 0" class="empty-state"><i class="fas fa-folder-open"></i><p>No case studies added yet.</p></div>
            </div>
          </ng-container>

          <!-- TESTIMONIALS -->
          <ng-container *ngIf="activeSection === 'testimonials' && !loading">
            <div class="table-wrapper">
              <table class="data-table" *ngIf="testimonials.length > 0">
                <thead><tr><th>Client</th><th>Company</th><th>Position</th><th>Testimonial</th><th width="120">Actions</th></tr></thead>
                <tbody>
                  <tr *ngFor="let item of testimonials">
                    <td><strong>{{item.clientName}}</strong></td>
                    <td>{{item.company || '-'}}</td>
                    <td>{{item.position || '-'}}</td>
                    <td>{{item.testimonial | slice:0:80}}...</td>
                    <td>
                      <button class="action-btn edit" (click)="openEditModal('testimonials', item)" title="Edit"><i class="fas fa-edit"></i></button>
                      <button class="action-btn delete" (click)="deleteItem('testimonials', item.id)" title="Delete"><i class="fas fa-trash"></i></button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div *ngIf="testimonials.length === 0" class="empty-state"><i class="fas fa-comments"></i><p>No testimonials added yet.</p></div>
            </div>
          </ng-container>

          <!-- CONTACT REQUESTS -->
          <ng-container *ngIf="activeSection === 'contacts' && !loading">
            <app-contact-list></app-contact-list>
          </ng-container>
        </div>
      </main>
    </div>

    <!-- MODALS -->
    <div class="modal-overlay" *ngIf="showModal" (click)="showModal = false">
      <div class="modal" (click)="$event.stopPropagation()">
        <app-experience-form *ngIf="modalType === 'experiences'" [data]="editItem" (saved)="onSaved()" (cancelled)="showModal = false"></app-experience-form>
        <app-project-form *ngIf="modalType === 'projects'" [data]="editItem" (saved)="onSaved()" (cancelled)="showModal = false"></app-project-form>
        <app-skill-form *ngIf="modalType === 'skills'" [data]="editItem" (saved)="onSaved()" (cancelled)="showModal = false"></app-skill-form>
        <app-certification-form *ngIf="modalType === 'certifications'" [data]="editItem" (saved)="onSaved()" (cancelled)="showModal = false"></app-certification-form>
        <app-blog-form *ngIf="modalType === 'blogs'" [data]="editItem" (saved)="onSaved()" (cancelled)="showModal = false"></app-blog-form>
        <app-case-study-form *ngIf="modalType === 'case-studies'" [data]="editItem" (saved)="onSaved()" (cancelled)="showModal = false"></app-case-study-form>
        <app-testimonial-form *ngIf="modalType === 'testimonials'" [data]="editItem" (saved)="onSaved()" (cancelled)="showModal = false"></app-testimonial-form>
      </div>
    </div>

    <!-- Toast -->
    <div class="toast toast-success" *ngIf="toastMessage" [class.toast-success]="!toastError" [class.toast-error]="toastError">
      {{toastMessage}}
    </div>
  `,
  styles: [`
    .admin-layout {
      display: flex;
      min-height: 100vh;
    }
    .admin-sidebar {
      width: 260px;
      background: var(--bg-secondary);
      border-right: 1px solid var(--border-subtle);
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      z-index: 100;
    }
    @media (max-width: 768px) {
      .admin-sidebar { width: 100%; position: relative; }
      .admin-layout { flex-direction: column; }
    }
    .sidebar-brand {
      padding: 20px 24px;
      border-bottom: 1px solid var(--border-subtle);
      display: flex;
      align-items: center;
      gap: 12px;
      .nav-brand {
        font-size: 1.25rem;
        font-weight: 800;
        color: var(--text-primary);
        span {
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      }
      .admin-badge {
        padding: 3px 8px;
        background: var(--accent-gradient);
        color: var(--text-inverse);
        font-size: 0.625rem;
        font-weight: 700;
        border-radius: 4px;
        letter-spacing: 0.05em;
      }
    }
    .sidebar-nav {
      flex: 1;
      padding: 12px;
      overflow-y: auto;
    }
    .sidebar-link {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 16px;
      border-radius: var(--radius-md);
      color: var(--text-secondary);
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      border: none;
      background: none;
      width: 100%;
      text-align: left;
      font-family: var(--font-sans);
      transition: all var(--transition-fast);
      text-decoration: none;
      position: relative;

      &:hover {
        background: var(--bg-card);
        color: var(--text-primary);
      }
      &.active {
        background: var(--accent-gradient-soft);
        color: var(--accent-primary);
      }
      i {
        width: 20px;
        text-align: center;
      }
    }
    .sidebar-count {
      margin-left: auto;
      padding: 2px 8px;
      background: var(--bg-card);
      border-radius: 100px;
      font-size: 0.6875rem;
      font-family: var(--font-mono);
    }
    .sidebar-footer {
      padding: 12px;
      border-top: 1px solid var(--border-subtle);
    }
    .admin-main {
      flex: 1;
      margin-left: 260px;
      padding: 32px;
      min-height: 100vh;
    }
    @media (max-width: 768px) {
      .admin-main { margin-left: 0; padding: 20px; }
    }
    .admin-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
      flex-wrap: wrap;
      gap: 16px;
      h1 {
        font-size: 1.5rem;
        font-weight: 700;
      }
    }
    .stats-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 32px;
    }
    @media (max-width: 768px) {
      .stats-row { grid-template-columns: repeat(2, 1fr); }
    }
    .stat-card {
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 20px;
      .stat-card-value {
        font-size: 1.75rem;
        font-weight: 800;
        background: var(--accent-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 4px;
      }
      .stat-card-label {
        font-size: 0.8125rem;
        color: var(--text-secondary);
      }
    }
    .admin-content {
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      overflow: hidden;
    }
    .table-wrapper { overflow-x: auto; }
    .action-btn {
      width: 32px;
      height: 32px;
      border-radius: var(--radius-sm);
      border: none;
      background: transparent;
      color: var(--text-muted);
      cursor: pointer;
      transition: all var(--transition-fast);
      margin-right: 4px;

      &:hover {
        background: var(--bg-card-hover);
      }
      &.edit:hover { color: var(--info); }
      &.delete:hover { color: var(--danger); background: rgba(239,68,68,0.1); }
    }
    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: var(--text-muted);
      i { font-size: 2.5rem; margin-bottom: 16px; display: block; opacity: 0.5; }
    }
  `]
})
export class DashboardComponent implements OnInit, OnDestroy {
  activeSection: Section = 'experiences';
  showModal = false;
  modalType: ModalType = null;
  editItem: any = null;
  loading = true;
  toastMessage = '';
  toastError = false;

  experiences: Experience[] = [];
  projects: Project[] = [];
  skills: Skill[] = [];
  certifications: Certification[] = [];
  blogs: Blog[] = [];
  caseStudies: CaseStudy[] = [];
  testimonials: Testimonial[] = [];
  contacts: ContactRequest[] = [];

  navItems = [
    { section: 'experiences' as Section, label: 'Experiences', icon: 'fa-briefcase' },
    { section: 'projects' as Section, label: 'Projects', icon: 'fa-code' },
    { section: 'skills' as Section, label: 'Skills', icon: 'fa-cogs' },
    { section: 'certifications' as Section, label: 'Certifications', icon: 'fa-certificate' },
    { section: 'blogs' as Section, label: 'Blog Articles', icon: 'fa-newspaper' },
    { section: 'case-studies' as Section, label: 'Case Studies', icon: 'fa-folder-open' },
    { section: 'testimonials' as Section, label: 'Testimonials', icon: 'fa-comments' },
    { section: 'contacts' as Section, label: 'Contact Requests', icon: 'fa-envelope' },
  ];

  private subs: Subscription[] = [];

  constructor(
    private expService: ExperienceService,
    private projService: ProjectService,
    private skillService: SkillService,
    private certService: CertificationService,
    private blogService: BlogService,
    private csService: CaseStudyService,
    private testService: TestimonialService,
    private contactService: ContactService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() { this.loadAll(); }

  ngOnDestroy() { this.subs.forEach(s => s.unsubscribe()); }

  loadAll() {
    this.loading = true;
    const done = { count: 0, total: 8 };
    const check = () => { if (++done.count >= done.total) this.loading = false; };

    this.subs.push(this.expService.getAll().subscribe(d => { this.experiences = d; check(); }));
    this.subs.push(this.projService.getAll().subscribe(d => { this.projects = d; check(); }));
    this.subs.push(this.skillService.getAll().subscribe(d => { this.skills = d; check(); }));
    this.subs.push(this.certService.getAll().subscribe(d => { this.certifications = d; check(); }));
    this.subs.push(this.blogService.getAll().subscribe(d => { this.blogs = d; check(); }));
    this.subs.push(this.csService.getAll().subscribe(d => { this.caseStudies = d; check(); }));
    this.subs.push(this.testService.getAll().subscribe(d => { this.testimonials = d; check(); }));
    this.subs.push(this.contactService.getAll().subscribe(d => { this.contacts = d; check(); }));
  }

  getCount(section: Section): number {
    switch(section) {
      case 'experiences': return this.experiences.length;
      case 'projects': return this.projects.length;
      case 'skills': return this.skills.length;
      case 'certifications': return this.certifications.length;
      case 'blogs': return this.blogs.length;
      case 'case-studies': return this.caseStudies.length;
      case 'testimonials': return this.testimonials.length;
      case 'contacts': return this.contacts.length;
    }
  }

  get sectionStats() {
    switch(this.activeSection) {
      case 'experiences': return [{value: this.experiences.length, label: 'Total'}, {value: this.experiences.filter(e => !e.endDate).length, label: 'Current'}];
      case 'projects': return [{value: this.projects.length, label: 'Total Projects'}, {value: this.projects.filter(p => p.githubUrl).length, label: 'With Code'}];
      case 'skills': return [{value: this.skills.length, label: 'Total Skills'}, {value: new Set(this.skills.map(s => s.category)).size, label: 'Categories'}];
      case 'certifications': return [{value: this.certifications.length, label: 'Total'}, {value: this.certifications.filter(c => c.credentialUrl).length, label: 'Verifiable'}];
      case 'blogs': return [{value: this.blogs.length, label: 'Articles'}, {value: new Set(this.blogs.map(b => b.category)).size, label: 'Categories'}];
      case 'case-studies': return [{value: this.caseStudies.length, label: 'Case Studies'}, {value: new Set(this.caseStudies.map(c => c.industry)).size, label: 'Industries'}];
      case 'testimonials': return [{value: this.testimonials.length, label: 'Testimonials'}];
      default: return [];
    }
  }

  getSectionTitle(): string {
    return this.navItems.find(n => n.section === this.activeSection)?.label || '';
  }

  getSingularTitle(): string {
    const map: Record<Section, string> = {
      'experiences': 'Experience',
      'projects': 'Project',
      'skills': 'Skill',
      'certifications': 'Certification',
      'blogs': 'Article',
      'case-studies': 'Case Study',
      'testimonials': 'Testimonial',
      'contacts': 'Contact'
    };
    return map[this.activeSection] || '';
  }

  openAddModal() {
    this.editItem = null;
    this.modalType = this.activeSection;
    this.showModal = true;
  }

  openEditModal(type: ModalType, item: any) {
    this.editItem = item;
    this.modalType = type;
    this.showModal = true;
  }

  onSaved() {
    this.showModal = false;
    this.editItem = null;
    this.showToast('Saved successfully!');
    this.loadAll();
  }

  deleteItem(section: Section, id: number) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    let obs;
    switch(section) {
      case 'experiences': obs = this.expService.delete(id); break;
      case 'projects': obs = this.projService.delete(id); break;
      case 'skills': obs = this.skillService.delete(id); break;
      case 'certifications': obs = this.certService.delete(id); break;
      case 'blogs': obs = this.blogService.delete(id); break;
      case 'case-studies': obs = this.csService.delete(id); break;
      case 'testimonials': obs = this.testService.delete(id); break;
      default: return;
    }
    obs.subscribe({
      next: () => { this.showToast('Deleted successfully!'); this.loadAll(); },
      error: () => this.showToast('Failed to delete.', true)
    });
  }

  showToast(msg: string, error = false) {
    this.toastMessage = msg;
    this.toastError = error;
    setTimeout(() => this.toastMessage = '', 4000);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  splitTech(tech: string): string[] {
    return tech.split(/[,;]/).map(t => t.trim()).filter(t => t);
  }

  splitTags(tags?: string): string[] {
    return tags ? tags.split(/[,;]/).map(t => t.trim()).filter(t => t) : [];
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  }
}
