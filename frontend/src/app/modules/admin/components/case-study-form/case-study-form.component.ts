import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CaseStudyService } from '../../../../services/case-study.service';

@Component({
  selector: 'app-case-study-form',
  template: `
    <div class="modal-header"><h3>{{editMode ? 'Edit' : 'Add'}} Case Study</h3><button class="modal-close" (click)="cancel.emit()">&times;</button></div>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="form-group"><label class="form-label">Title *</label><input class="form-input" formControlName="title" placeholder="Case study title"></div>
      <div class="form-group"><label class="form-label">Industry *</label><input class="form-input" formControlName="industry" placeholder="e.g., Aviation, Finance"></div>
      <div class="form-group"><label class="form-label">Business Problem</label><textarea class="form-textarea" formControlName="businessProblem" placeholder="Describe the business problem..."></textarea></div>
      <div class="form-group"><label class="form-label">Technical Challenges</label><textarea class="form-textarea" formControlName="technicalChallenges" placeholder="Technical challenges faced..."></textarea></div>
      <div class="form-group"><label class="form-label">Solution Architecture</label><textarea class="form-textarea" formControlName="solutionArchitecture" placeholder="Describe the solution architecture..."></textarea></div>
      <div class="form-group"><label class="form-label">Technologies Used (comma separated)</label><input class="form-input" formControlName="technologiesUsed" placeholder="Java, Spring Boot, Kafka"></div>
      <div class="form-group"><label class="form-label">My Contributions</label><textarea class="form-textarea" formControlName="myContributions" placeholder="Your specific contributions..."></textarea></div>
      <div class="form-group"><label class="form-label">Business Impact</label><input class="form-input" formControlName="businessImpact" placeholder="e.g., Reduced processing time by 50%"></div>
      <div class="form-group"><label class="form-label">Lessons Learned</label><textarea class="form-textarea" formControlName="lessonsLearned" placeholder="Key takeaways..."></textarea></div>
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
export class CaseStudyFormComponent implements OnInit {
  @Input() data: any = null;
  @Output() saved = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  form: FormGroup;
  loading = false;
  error = '';
  editMode = false;

  constructor(private fb: FormBuilder, private service: CaseStudyService) {
    this.form = this.fb.group({
      id: [null], title: ['', Validators.required], industry: ['', Validators.required],
      businessProblem: [''], technicalChallenges: [''], solutionArchitecture: [''],
      technologiesUsed: [''], myContributions: [''], businessImpact: [''], lessonsLearned: ['']
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
