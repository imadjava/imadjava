import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-project-manager',
  template: `<h2>Manage Projects</h2><p>Project management interface under construction</p>`
})
export class ProjectManagerComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder) { this.form = fb.group({}); }
  ngOnInit() { }
}

