import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContactService } from '../../../../services/contact.service';
import { ContactRequest } from '../../../../models/contact-request.model';

@Component({
  selector: 'app-contact-list',
  template: `
    <div class="table-wrapper">
      <div style="display:flex;gap:12px;margin-bottom:20px;padding:0 20px">
        <button class="category-tab" [class.active]="filter === 'all'" (click)="setFilter('all')">All</button>
        <button class="category-tab" [class.active]="filter === 'unprocessed'" (click)="setFilter('unprocessed')">Unprocessed</button>
      </div>
      <table class="data-table" *ngIf="contacts.length > 0">
        <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Company</th><th>Message</th><th>Date</th><th>Status</th><th width="100">Actions</th></tr></thead>
        <tbody>
          <tr *ngFor="let c of contacts">
            <td><strong>{{c.name}}</strong></td>
            <td><a [href]="'mailto:'+c.email">{{c.email}}</a></td>
            <td>{{c.phone || '-'}}</td>
            <td>{{c.company || '-'}}</td>
            <td>{{c.message | slice:0:60}}...</td>
            <td>{{formatDate(c.createdAt)}}</td>
            <td>
              <span class="badge" [class.badge-primary]="!c.processed" [class.badge-secondary]="c.processed">
                {{c.processed ? 'Processed' : 'New'}}
              </span>
            </td>
            <td>
              <button *ngIf="!c.processed" class="action-btn edit" (click)="markProcessed(c.id)" title="Mark Processed"><i class="fas fa-check"></i></button>
              <button class="action-btn delete" (click)="deleteContact(c.id)" title="Delete"><i class="fas fa-trash"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
      <div *ngIf="contacts.length === 0" class="empty-state"><i class="fas fa-inbox"></i><p>No contact requests found.</p></div>
    </div>
  `,
  styles: [`
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
      }
    }
    .action-btn {
      width: 32px; height: 32px; border-radius: var(--radius-sm); border: none;
      background: transparent; color: var(--text-muted); cursor: pointer;
      transition: all var(--transition-fast); margin-right: 4px;
      &:hover { background: var(--bg-card-hover); }
      &.edit:hover { color: var(--success); background: rgba(0,212,170,0.1); }
      &.delete:hover { color: var(--danger); background: rgba(239,68,68,0.1); }
    }
    .empty-state { text-align: center; padding: 60px 20px; color: var(--text-muted);
      i { font-size: 2.5rem; margin-bottom: 16px; display: block; opacity: 0.5; }
    }
  `]
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: ContactRequest[] = [];
  filter = 'all';
  private sub!: Subscription;

  constructor(private contactService: ContactService) {}

  ngOnInit() { this.load(); }
  ngOnDestroy() { this.sub?.unsubscribe(); }

  load() {
    const obs = this.filter === 'unprocessed' ? this.contactService.getUnprocessed() : this.contactService.getAll();
    this.sub = obs.subscribe(data => this.contacts = data);
  }

  setFilter(f: string) {
    this.filter = f;
    this.load();
  }

  markProcessed(id: number) {
    this.contactService.markProcessed(id).subscribe(() => this.load());
  }

  deleteContact(id: number) {
    if (!confirm('Delete this contact request?')) return;
    this.contactService.delete(id).subscribe(() => this.load());
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }
}
