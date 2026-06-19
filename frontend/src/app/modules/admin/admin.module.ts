import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/dashboard/dashboard.component';
import { ExperienceManagerComponent } from './components/experience/experience.component';
import { ProjectManagerComponent } from './components/project/project.component';
import { SkillManagerComponent } from './components/skill/skill.component';

const routes: Routes = [
  {
    path: '', component: AdminDashboardComponent,
    children: [
      { path: 'experiences', component: ExperienceManagerComponent },
      { path: 'projects', component: ProjectManagerComponent },
      { path: 'skills', component: SkillManagerComponent }
    ]
  }
];

@NgModule({
  declarations: [AdminDashboardComponent, ExperienceManagerComponent, ProjectManagerComponent, SkillManagerComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)]
})
export class AdminModule { }

