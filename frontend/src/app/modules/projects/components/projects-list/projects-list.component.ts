import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects-list',
  template: `<div class="container"><h2>Featured Projects</h2><p>Projects loading from API...</p></div>`,
  styles: [`.container { padding: 20px; }`]
})
export class ProjectsListComponent implements OnInit {
  constructor() { }
  ngOnInit() { }
}

