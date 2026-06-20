import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestimonialService } from '../../../../services/testimonial.service';

@Component({
  selector: 'app-testimonial-form',
  template: `
    <div class="modal-header"><h3>{{editMode ? 'Edit' : 'Add'}} Testimonial</h3><button class="modal-close" (click)="cancel.emit()">&times;</button></div>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="form-group"><label class="form-label">Client Name *</label><input class="form-input" formControlName="clientName" placeholder="e.g., John Smith"></div>
      <div class="form-row">
        <div class="form-group" style="flex:1"><label class="form-label">Company</label><input class="form-input" formControlName="company" placeholder="e.g., Tech Corp"></div>
        <div class="form-group" style="flex:1"><label class="form-label">Position</label><input class="form-input" formControlName="position" placeholder="e.g., CTO"></div>
      </div>
      <div class="form-group"><label class="form-label">Testimonial *</label><textarea class="form-textarea" formControlName="testimonial" rows="5" placeholder="The testimonial text..."></textarea></div>
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
export class TestimonialFormComponent implements OnInit {
  @Input() data: any = null;
  @Output() saved = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  form: FormGroup;
  loading = false;
  error = '';
  editMode = false;

  constructor(private fb: FormBuilder, private service: TestimonialService) {
    this.form = this.fb.group({
      id: [null], clientName: ['', Validators.required], company: [''],
      position: [''], testimonial: ['', Validators.required]
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
