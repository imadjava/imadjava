import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExperienceFormComponent } from './components/experience-form/experience-form.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { SkillFormComponent } from './components/skill-form/skill-form.component';
import { CertificationFormComponent } from './components/certification-form/certification-form.component';
import { BlogFormComponent } from './components/blog-form/blog-form.component';
import { CaseStudyFormComponent } from './components/case-study-form/case-study-form.component';
import { TestimonialFormComponent } from './components/testimonial-form/testimonial-form.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';

const routes: Routes = [
  { path: '', component: DashboardComponent }
];

@NgModule({
  declarations: [
    DashboardComponent,
    ExperienceFormComponent,
    ProjectFormComponent,
    SkillFormComponent,
    CertificationFormComponent,
    BlogFormComponent,
    CaseStudyFormComponent,
    TestimonialFormComponent,
    ContactListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
