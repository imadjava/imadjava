import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CertificationService } from '../../../../services/certification.service';

@Component({
  selector: 'app-certification-form',
  template: `
    <div class="modal-header"><h3>{{editMode ? 'Edit' : 'Add'}} Certification</h3><button class="modal-close" (click)="cancel.emit()">&times;</button></div>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="form-group"><label class="form-label">Name *</label><input class="form-input" formControlName="name" placeholder="e.g., AWS Solutions Architect"></div>
      <div class="form-row">
        <div class="form-group" style="flex:1"><label class="form-label">Provider *</label><input class="form-input" formControlName="provider" placeholder="e.g., Amazon"></div>
        <div class="form-group" style="flex:1"><label class="form-label">Issue Date *</label><input type="date" class="form-input" formControlName="issueDate"></div>
      </div>
      <div class="form-group"><label class="form-label">Credential URL</label><input class="form-input" formControlName="credentialUrl" placeholder="https://..."></div>
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
export class CertificationFormComponent implements OnInit {
  @Input() data: any = null;
  @Output() saved = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  form: FormGroup;
  loading = false;
  error = '';
  editMode = false;

  constructor(private fb: FormBuilder, private service: CertificationService) {
    this.form = this.fb.group({ id: [null], name: ['', Validators.required], provider: ['', Validators.required], issueDate: ['', Validators.required], credentialUrl: [''] });
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
