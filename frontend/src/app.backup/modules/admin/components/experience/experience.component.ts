import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExperienceService } from '../../../../services/experience.service';

@Component({
  selector: 'app-experience-manager',
  template: `<h2>Manage Experiences</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form">
      <input type="text" formControlName="companyName" placeholder="Company Name" class="form-control">
      <input type="text" formControlName="designation" placeholder="Job Title" class="form-control">
      <textarea formControlName="responsibilities" placeholder="Responsibilities"></textarea>
      <textarea formControlName="achievements" placeholder="Achievements"></textarea>
      <button type="submit" [disabled]="!form.valid">Save</button>
    </form>
    <div *ngFor="let exp of experiences" class="item">
      <h4>{{ exp.companyName }} - {{ exp.designation }}</h4>
      <button (click)="delete(exp.id)">Delete</button>
    </div>`
})
export class ExperienceManagerComponent implements OnInit {
  form: FormGroup;
  experiences: any[] = [];
  constructor(private fb: FormBuilder, private experienceService: ExperienceService) {
    this.form = fb.group({ companyName: ['', Validators.required], designation: ['', Validators.required], responsibilities: [''], achievements: [''] });
  }
  ngOnInit() { this.loadExperiences(); }
  loadExperiences() { this.experienceService.list().subscribe(data => this.experiences = data); }
  onSubmit() { if (!this.form.valid) return; this.experienceService.create(this.form.value).subscribe(() => { this.form.reset(); this.loadExperiences(); }); }
  delete(id: number) { this.experienceService.delete(id).subscribe(() => this.loadExperiences()); }
}

