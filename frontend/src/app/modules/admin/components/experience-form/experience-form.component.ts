import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExperienceService } from '../../../../services/experience.service';

@Component({
  selector: 'app-experience-form',
  template: `
    <div class="modal-header"><h3>{{editMode ? 'Edit' : 'Add'}} Experience</h3><button class="modal-close" (click)="cancelled.emit()">&times;</button></div>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="form-group"><label class="form-label">Company Name *</label><input class="form-input" formControlName="companyName" placeholder="e.g., Acme Corp"></div>
      <div class="form-group"><label class="form-label">Designation *</label><input class="form-input" formControlName="designation" placeholder="e.g., Senior Java Developer"></div>
      <div class="form-row">
        <div class="form-group" style="flex:1"><label class="form-label">Start Date *</label><input type="date" class="form-input" formControlName="startDate"></div>
        <div class="form-group" style="flex:1"><label class="form-label">End Date (leave blank if current)</label><input type="date" class="form-input" formControlName="endDate"></div>
      </div>
      <div class="form-group"><label class="form-label">Responsibilities</label><textarea class="form-textarea" formControlName="responsibilities" placeholder="Describe your responsibilities..."></textarea></div>
      <div class="form-group"><label class="form-label">Achievements</label><textarea class="form-textarea" formControlName="achievements" placeholder="Key achievements..."></textarea></div>
      <div class="form-error" *ngIf="error">{{error}}</div>
      <div class="flex gap-4" style="justify-content:flex-end">
        <button type="button" class="btn btn-secondary" (click)="cancelled.emit()">Cancel</button>
        <button type="submit" class="btn btn-primary" [disabled]="form.invalid || loading">
          <span *ngIf="!loading">{{editMode ? 'Update' : 'Create'}}</span>
          <div class="spinner" style="width:16px;height:16px;border-width:2px;margin:0 auto" *ngIf="loading"></div>
        </button>
      </div>
    </form>
  `
})
export class ExperienceFormComponent implements OnInit {
  @Input() data: any = null;
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();
  form: FormGroup;
  loading = false;
  error = '';
  editMode = false;

  constructor(private fb: FormBuilder, private service: ExperienceService) {
    this.form = this.fb.group({
      id: [null], companyName: ['', Validators.required], designation: ['', Validators.required],
      startDate: ['', Validators.required], endDate: [''],
      responsibilities: [''], achievements: ['']
    });
  }

  ngOnInit() {
    if (this.data) {
      this.editMode = true;
      this.form.patchValue(this.data);
    }
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
