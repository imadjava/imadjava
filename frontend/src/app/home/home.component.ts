import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="hero">
      <h1>Full Name - Senior Java Full Stack Developer</h1>
      <p>Enterprise Java | Microservices | Cloud | Angular</p>
    </div>
  `,
  styles: [`.hero { padding: 40px; text-align:center }`]
})
export class HomeComponent { }

