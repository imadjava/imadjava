import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';

const routes: Routes = [
  { path: '', component: BlogListComponent },
  { path: ':id', component: BlogDetailComponent }
];

@NgModule({
  declarations: [BlogListComponent, BlogDetailComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class BlogModule { }
