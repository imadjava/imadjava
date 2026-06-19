import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-list',
  template: `<div class="container"><h2>Blog Articles</h2><p>Articles loading from API...</p></div>`,
  styles: [`.container { padding: 20px; }`]
})
export class BlogListComponent implements OnInit {
  constructor() { }
  ngOnInit() { }
}

