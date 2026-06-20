import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SkillService } from '../../../../services/skill.service';

@Component({
  selector: 'app-skill-form',
  template: `
    <div class="modal-header"><h3>{{editMode ? 'Edit' : 'Add'}} Skill</h3><button class="modal-close" (click)="cancel.emit()">&times;</button></div>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="form-group"><label class="form-label">Name *</label><input class="form-input" formControlName="name" placeholder="e.g., Java"></div>
      <div class="form-group">
        <label class="form-label">Category *</label>
        <select class="form-select" formControlName="category">
          <option value="">Select category</option>
          <option value="Backend">Backend</option>
          <option value="Frontend">Frontend</option>
          <option value="Cloud">Cloud</option>
          <option value="Databases">Databases</option>
          <option value="Tools">Tools</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Proficiency * (1-5)</label>
        <input type="range" class="form-input" formControlName="proficiency" min="1" max="5" style="accent-color:var(--accent-primary)">
        <div style="text-align:center;color:var(--accent-primary);font-family:var(--font-mono);font-size:1.25rem;font-weight:700;margin-top:8px">{{form.value.proficiency}}/5</div>
      </div>
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
export class SkillFormComponent implements OnInit {
  @Input() data: any = null;
  @Output() saved = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  form: FormGroup;
  loading = false;
  error = '';
  editMode = false;

  constructor(private fb: FormBuilder, private service: SkillService) {
    this.form = this.fb.group({ id: [null], name: ['', Validators.required], category: ['', Validators.required], proficiency: [3, Validators.required] });
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
