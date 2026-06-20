import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-skill-manager',
  template: `<h2>Manage Skills</h2><p>Skill management interface under construction</p>`
})
export class SkillManagerComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder) { this.form = fb.group({}); }
  ngOnInit() { }
}

