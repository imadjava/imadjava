import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../../../services/blog.service';

@Component({
  selector: 'app-blog-form',
  template: `
    <div class="modal-header"><h3>{{editMode ? 'Edit' : 'Add'}} Article</h3><button class="modal-close" (click)="cancel.emit()">&times;</button></div>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="form-group"><label class="form-label">Title *</label><input class="form-input" formControlName="title" placeholder="Article title"></div>
      <div class="form-row">
        <div class="form-group" style="flex:1"><label class="form-label">Category *</label><input class="form-input" formControlName="category" placeholder="e.g., Java"></div>
        <div class="form-group" style="flex:1"><label class="form-label">Tags (comma separated)</label><input class="form-input" formControlName="tags" placeholder="spring,microservices"></div>
      </div>
      <div class="form-group"><label class="form-label">Content *</label><textarea class="form-textarea" formControlName="content" rows="8" placeholder="Write your article content..."></textarea></div>
      <div class="form-error" *ngIf="error">{{error}}</div>
      <div class="flex gap-4" style="justify-content:flex-end">
        <button type="button" class="btn btn-secondary" (click)="cancel.emit()">Cancel</button>
        <button type="submit" class="btn btn-primary" [disabled]="form.invalid || loading">
          <span *ngIf="!loading">{{editMode ? 'Update' : 'Create'}}</span>
          <div class="spinner" style="width:16px;height:16px;border-width:2px;margin:0 auto" *ngIf="loading"></div>
        </button>
      </div>
    </form>
  `
})
export class BlogFormComponent implements OnInit {
  @Input() data: any = null;
  @Output() saved = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  form: FormGroup;
  loading = false;
  error = '';
  editMode = false;

  constructor(private fb: FormBuilder, private service: BlogService) {
    this.form = this.fb.group({
      id: [null], title: ['', Validators.required], category: ['', Validators.required],
      tags: [''], content: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.data) { this.editMode = true; this.form.patchValue(this.data); }
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    const val = this.form.value;
    const obs = this.editMode ? this.service.update(val.id, val) : this.service.create(val);
    obs.subscribe({
      next: () => { this.saved.emit(); this.loading = false; },
      error: (err: any) => { this.error = err.error?.error || 'Failed to save.'; this.loading = false; }
    });
  }
}
