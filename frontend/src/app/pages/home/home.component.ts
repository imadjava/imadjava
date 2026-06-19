import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  template: `
    <div class="hero-section">
      <div class="container">
        <h1>Senior Java Full Stack Developer</h1>
        <p class="tagline">Enterprise Java | Microservices | Cloud-Native Applications</p>
        <div class="cta-buttons">
          <button class="btn btn-primary">Download Resume</button>
          <button class="btn btn-secondary">Get In Touch</button>
        </div>
      </div>
    </div>

    <section class="featured-projects">
      <div class="container">
        <h2>Featured Projects</h2>
        <div class="grid">
          <!-- Projects loaded from API -->
        </div>
      </div>
    </section>

    <section class="skills-section">
      <div class="container">
        <h2>Technical Skills</h2>
        <div class="skills-grid">
          <!-- Skills loaded from API -->
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      background: linear-gradient(135deg, var(--primary) 0%, #4c63d2 100%);
      color: white;
      padding: 100px 20px;
      text-align: center;
    }
    .hero-section h1 {
      font-size: 3rem;
      margin-bottom: 10px;
    }
    .tagline {
      font-size: 1.2rem;
      margin-bottom: 30px;
    }
    .cta-buttons button {
      margin: 0 10px;
      padding: 12px 30px;
      font-size: 1rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    .btn-primary {
      background: white;
      color: var(--primary);
    }
    .btn-secondary {
      background: transparent;
      border: 2px solid white;
      color: white;
    }
  `]
})
export class HomeComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}

