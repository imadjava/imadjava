import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';

const routes: Routes = [
  { path: '', component: ProjectListComponent },
  { path: ':id', component: ProjectDetailComponent }
];

@NgModule({
  declarations: [ProjectListComponent, ProjectDetailComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ProjectsModule { }
