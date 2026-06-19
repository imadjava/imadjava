import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogListComponent } from './components/blog-list/blog-list.component';

@NgModule({
  declarations: [BlogListComponent],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: BlogListComponent }])]
})
export class BlogModule { }

