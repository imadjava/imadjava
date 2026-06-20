import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';

@NgModule({
  declarations: [ProjectsListComponent],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: ProjectsListComponent }])]
})
export class ProjectsModule { }

