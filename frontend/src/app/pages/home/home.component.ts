import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExperienceService } from '../../services/experience.service';
import { ProjectService } from '../../services/project.service';
import { SkillService } from '../../services/skill.service';
import { CertificationService } from '../../services/certification.service';
import { TestimonialService } from '../../services/testimonial.service';
import { BlogService } from '../../services/blog.service';
import { CaseStudyService } from '../../services/case-study.service';
import { Experience } from '../../models/experience.model';
import { Project } from '../../models/project.model';
import { Skill } from '../../models/skill.model';
import { Certification } from '../../models/certification.model';
import { Testimonial } from '../../models/testimonial.model';
import { Blog } from '../../models/blog.model';
import { CaseStudy } from '../../models/case-study.model';

@Component({
  selector: 'app-home',
  template: `
    <!-- ========== HERO SECTION ========== -->
    <section class="hero">
      <div class="hero-bg">
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
        <div class="grid-pattern"></div>
      </div>
      <div class="container hero-content">
        <div class="hero-badge animate-fade-in-up">
          <span class="badge badge-primary">
            <i class="fas fa-circle" style="font-size:6px;vertical-align:middle;margin-right:6px"></i>
            Available for Opportunities
          </span>
        </div>
        <h1 class="hero-title animate-fade-in-up delay-1">
          Senior Java<br>
          <span class="text-gradient">Full Stack</span> Developer
        </h1>
        <p class="hero-subtitle animate-fade-in-up delay-2">
          I architect and build scalable enterprise applications using Java, Spring Boot,
          Angular, and cloud-native technologies. Passionate about clean code, microservices,
          and delivering business value through technology.
        </p>
        <div class="hero-actions animate-fade-in-up delay-3">
          <a routerLink="/projects" class="btn btn-primary btn-lg">
            <i class="fas fa-rocket"></i> View My Work
          </a>
          <a routerLink="/contact" class="btn btn-secondary btn-lg">
            <i class="fas fa-envelope"></i> Get In Touch
          </a>
        </div>
        <div class="hero-tech animate-fade-in-up delay-4">
          <span class="hero-tech-label">Tech Stack</span>
          <div class="hero-tech-icons">
            <span class="tech-item" title="Java"><i class="fab fa-java"></i> Java</span>
            <span class="tech-item" title="Spring"><i class="fas fa-leaf"></i> Spring</span>
            <span class="tech-item" title="Angular"><i class="fab fa-angular"></i> Angular</span>
            <span class="tech-item" title="Docker"><i class="fab fa-docker"></i> Docker</span>
            <span class="tech-item" title="AWS"><i class="fab fa-aws"></i> AWS</span>
            <span class="tech-item" title="Kubernetes"><i class="fas fa-dharmachakra"></i> K8s</span>
          </div>
        </div>
      </div>
      <div class="scroll-indicator">
        <div class="mouse">
          <div class="wheel"></div>
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>

    <!-- ========== STATS SECTION ========== -->
    <section class="section section-alt" *ngIf="stats.length > 0">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-item reveal" *ngFor="let stat of stats; let i = index" [style.transition-delay]="i * 100 + 'ms'">
            <div class="stat-value">{{stat.value}}+</div>
            <div class="stat-label">{{stat.label}}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== ABOUT SECTION ========== -->
    <section id="about" class="section">
      <div class="container">
        <div class="about-grid">
          <div class="about-image reveal">
            <div class="about-image-wrapper">
              <div class="about-code-block">
                <div class="code-header">
                  <span class="code-dot red"></span>
                  <span class="code-dot yellow"></span>
                  <span class="code-dot green"></span>
                  <span class="code-filename">Developer.java</span>
                </div>
                <pre class="code-body"><code><span class="code-kw">public class</span> <span class="code-class">Developer</span> {{
  <span class="code-kw">private final</span> String name = <span class="code-str">"Senior Dev"</span>;
  <span class="code-kw">private final</span> String role = <span class="code-str">"Full Stack"</span>;
  <span class="code-kw">private final</span> List&lt;String&gt; skills = List.of(
    <span class="code-str">"Java"</span>, <span class="code-str">"Spring Boot"</span>,
    <span class="code-str">"Angular"</span>, <span class="code-str">"Microservices"</span>,
    <span class="code-str">"AWS"</span>, <span class="code-str">"Docker"</span>
  );

  <span class="code-kw">public</span> String <span class="code-func">getPassion</span>() {{
    <span class="code-kw">return</span> <span class="code-str">"Building scalable"</span>
         + <span class="code-str">"solutions that matter"</span>;
  }}
}}</code></pre>
              </div>
            </div>
          </div>
          <div class="about-content reveal">
            <div class="section-header text-left" style="margin-bottom:24px">
              <div class="section-label">About Me</div>
              <h2 class="section-title">Transforming Ideas Into<br><span class="text-gradient">Scalable Solutions</span></h2>
            </div>
            <p class="about-text">
              With over a decade of experience in enterprise software development, I specialize in designing
              and implementing robust backend systems with Java and Spring Boot, paired with modern
              Angular frontends. My expertise spans microservices architecture, cloud-native deployments,
              and DevOps practices.
            </p>
            <p class="about-text">
              I've led teams through digital transformations, modernized legacy systems, and delivered
              high-impact solutions across finance, aviation, and e-commerce domains.
            </p>
            <div class="about-highlights">
              <div class="highlight-item">
                <i class="fas fa-check-circle"></i>
                <span>Microservices Architecture</span>
              </div>
              <div class="highlight-item">
                <i class="fas fa-check-circle"></i>
                <span>Cloud-Native Development</span>
              </div>
              <div class="highlight-item">
                <i class="fas fa-check-circle"></i>
                <span>CI/CD & DevOps</span>
              </div>
              <div class="highlight-item">
                <i class="fas fa-check-circle"></i>
                <span>Team Leadership</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== EXPERIENCE SECTION ========== -->
    <section id="experience" class="section section-alt" *ngIf="experiences.length > 0">
      <div class="container">
        <div class="section-header reveal">
          <div class="section-label">Experience</div>
          <h2 class="section-title">Professional <span class="text-gradient">Journey</span></h2>
          <p class="section-desc">A track record of delivering impactful solutions across diverse industries and roles.</p>
        </div>
        <div class="timeline">
          <div class="timeline-item reveal" *ngFor="let exp of experiences; let i = index" [style.transition-delay]="i * 100 + 'ms'">
            <div class="timeline-date">{{formatDate(exp.startDate)}} - {{exp.endDate ? formatDate(exp.endDate) : 'Present'}}</div>
            <div class="timeline-title">{{exp.designation}}</div>
            <div class="timeline-company">{{exp.companyName}}</div>
            <p class="timeline-desc">{{exp.responsibilities}}</p>
            <div class="timeline-tags" *ngIf="exp.achievements">
              <span class="badge badge-primary">{{exp.achievements}}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== SKILLS SECTION ========== -->
    <section id="skills" class="section" *ngIf="skills.length > 0">
      <div class="container">
        <div class="section-header reveal">
          <div class="section-label">Skills</div>
          <h2 class="section-title">Technical <span class="text-gradient">Expertise</span></h2>
          <p class="section-desc">Proficient across the full stack with deep expertise in backend architecture and cloud technologies.</p>
        </div>

        <div class="skills-category-tabs reveal">
          <button
            *ngFor="let cat of skillCategories"
            class="category-tab"
            [class.active]="selectedSkillCategory === cat"
            (click)="selectedSkillCategory = cat"
          >
            {{cat}}
          </button>
        </div>

        <div class="skills-grid reveal">
          <div class="skill-bar" *ngFor="let skill of filteredSkills; let i = index" [style.transition-delay]="i * 80 + 'ms'">
            <div class="skill-info">
              <span class="skill-name">{{skill.name}}</span>
              <span class="skill-level">{{skill.proficiency}}/5</span>
            </div>
            <div class="skill-track">
              <div class="skill-fill" [style.width.%]="(skill.proficiency / 5) * 100"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== PROJECTS SECTION ========== -->
    <section id="projects" class="section section-alt" *ngIf="projects.length > 0">
      <div class="container">
        <div class="section-header reveal">
          <div class="section-label">Portfolio</div>
          <h2 class="section-title">Featured <span class="text-gradient">Projects</span></h2>
          <p class="section-desc">A selection of projects showcasing architecture, design patterns, and technical depth.</p>
        </div>
        <div class="grid grid-3">
          <div class="project-card reveal" *ngFor="let project of projects.slice(0,6); let i = index" [style.transition-delay]="i * 100 + 'ms'">
            <div class="project-image">
              <span class="project-icon"><i class="fas fa-code"></i></span>
              <div class="project-links">
                <a *ngIf="project.githubUrl" [href]="project.githubUrl" target="_blank" title="View Code"><i class="fab fa-github"></i></a>
                <a *ngIf="project.liveUrl" [href]="project.liveUrl" target="_blank" title="Live Demo"><i class="fas fa-external-link-alt"></i></a>
              </div>
            </div>
            <div class="project-content">
              <h3 class="project-title">{{project.title}}</h3>
              <p class="project-desc">{{project.description}}</p>
              <div class="project-tech" *ngIf="project.technologies">
                <span class="tech-tag" *ngFor="let tech of splitTech(project.technologies)">{{tech}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-8 reveal" *ngIf="projects.length > 6">
          <a routerLink="/projects" class="btn btn-secondary">
            View All Projects <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>

    <!-- ========== CASE STUDIES SECTION ========== -->
    <section id="case-studies" class="section" *ngIf="caseStudies.length > 0">
      <div class="container">
        <div class="section-header reveal">
          <div class="section-label">Case Studies</div>
          <h2 class="section-title">Deep <span class="text-gradient">Dives</span></h2>
          <p class="section-desc">Detailed analysis of complex problems and the architectural decisions behind their solutions.</p>
        </div>
        <div class="grid grid-2">
          <div class="glass-card case-study-card reveal" *ngFor="let cs of caseStudies.slice(0,4); let i = index" [style.transition-delay]="i * 100 + 'ms'">
            <div class="case-study-header">
              <span class="badge badge-secondary">{{cs.industry}}</span>
            </div>
            <h3 class="case-study-title">{{cs.title}}</h3>
            <p class="case-study-problem" *ngIf="cs.businessProblem">
              <strong>Challenge:</strong> {{cs.businessProblem}}
            </p>
            <p class="case-study-solution" *ngIf="cs.solutionArchitecture">
              <strong>Solution:</strong> {{cs.solutionArchitecture}}
            </p>
            <div class="case-study-footer" *ngIf="cs.technologiesUsed">
              <div class="project-tech">
                <span class="tech-tag" *ngFor="let tech of splitTech(cs.technologiesUsed).slice(0,4)">{{tech}}</span>
              </div>
            </div>
            <div class="case-study-impact" *ngIf="cs.businessImpact">
              <i class="fas fa-chart-line"></i> {{cs.businessImpact}}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== CERTIFICATIONS SECTION ========== -->
    <section id="certifications" class="section section-alt" *ngIf="certifications.length > 0">
      <div class="container">
        <div class="section-header reveal">
          <div class="section-label">Credentials</div>
          <h2 class="section-title">Certifications & <span class="text-gradient">Awards</span></h2>
        </div>
        <div class="grid grid-2">
          <div class="cert-card reveal" *ngFor="let cert of certifications; let i = index" [style.transition-delay]="i * 100 + 'ms'">
            <div class="cert-icon"><i class="fas fa-certificate"></i></div>
            <div class="cert-content">
              <div class="cert-name">{{cert.name}}</div>
              <div class="cert-provider">{{cert.provider}}</div>
              <div class="cert-date">Issued {{formatDate(cert.issueDate)}}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== TESTIMONIALS SECTION ========== -->
    <section id="testimonials" class="section" *ngIf="testimonials.length > 0">
      <div class="container">
        <div class="section-header reveal">
          <div class="section-label">Testimonials</div>
          <h2 class="section-title">What People <span class="text-gradient">Say</span></h2>
        </div>
        <div class="grid grid-3">
          <div class="testimonial-card reveal" *ngFor="let t of testimonials.slice(0,6); let i = index" [style.transition-delay]="i * 100 + 'ms'">
            <div class="quote-icon"><i class="fas fa-quote-left"></i></div>
            <p class="quote-text">"{{t.testimonial}}"</p>
            <div class="quote-author">
              <div class="author-name">{{t.clientName}}</div>
              <div class="author-role">{{t.position}}<span *ngIf="t.company">, {{t.company}}</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========== BLOG PREVIEW SECTION ========== -->
    <section id="blog" class="section section-alt" *ngIf="blogs.length > 0">
      <div class="container">
        <div class="section-header reveal">
          <div class="section-label">Latest Articles</div>
          <h2 class="section-title">From The <span class="text-gradient">Blog</span></h2>
          <p class="section-desc">Sharing insights on Java, architecture, and full-stack development.</p>
        </div>
        <div class="grid grid-3">
          <div class="blog-card reveal" *ngFor="let blog of blogs.slice(0,3); let i = index" [style.transition-delay]="i * 100 + 'ms'">
            <div class="blog-meta">
              <span class="blog-category">{{blog.category}}</span>
              <span>{{formatDate(blog.createdAt)}}</span>
            </div>
            <h3 class="blog-title">{{blog.title}}</h3>
            <p class="blog-excerpt">{{blog.content | slice:0:200}}...</p>
            <div class="blog-tags" *ngIf="blog.tags">
              <span class="tag" *ngFor="let tag of splitTags(blog.tags)">{{tag}}</span>
            </div>
            <a class="read-more" [routerLink]="['/blog', blog.id]">Read Article <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>
        <div class="text-center mt-8 reveal" *ngIf="blogs.length > 3">
          <a routerLink="/blog" class="btn btn-secondary">
            View All Articles <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>

    <!-- ========== CTA SECTION ========== -->
    <section class="section cta-section">
      <div class="container">
        <div class="cta-box reveal">
          <div class="cta-content">
            <h2 class="cta-title">Let's Build Something<br><span class="text-gradient">Amazing Together</span></h2>
            <p class="cta-desc">Have a project in mind or looking for a senior developer to join your team? I'd love to hear about it.</p>
            <div class="cta-actions">
              <a routerLink="/contact" class="btn btn-primary btn-lg">
                <i class="fas fa-paper-plane"></i> Start a Conversation
              </a>
              <a href="https://linkedin.com" target="_blank" class="btn btn-secondary btn-lg">
                <i class="fab fa-linkedin"></i> Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* ---- Hero Section ---- */
    .hero {
      position: relative;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 120px 24px 80px;
      overflow: hidden;
    }

    .hero-content {
      position: relative;
      z-index: 1;
      max-width: 860px;
    }

    .hero-badge {
      margin-bottom: 24px;
    }

    .hero-title {
      font-size: clamp(2.5rem, 6vw, 4.5rem);
      font-weight: 800;
      line-height: 1.1;
      letter-spacing: -0.03em;
      margin-bottom: 24px;
      color: var(--text-primary);
    }

    .hero-subtitle {
      font-size: clamp(1rem, 2vw, 1.25rem);
      color: var(--text-secondary);
      max-width: 640px;
      margin: 0 auto 40px;
      line-height: 1.7;
    }

    .hero-actions {
      display: flex;
      gap: 16px;
      justify-content: center;
      margin-bottom: 48px;
      flex-wrap: wrap;
    }

    .hero-tech {
      .hero-tech-label {
        font-family: var(--font-mono);
        font-size: 0.75rem;
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 0.15em;
        margin-bottom: 16px;
        display: block;
      }

      .hero-tech-icons {
        display: flex;
        gap: 16px;
        justify-content: center;
        flex-wrap: wrap;
      }

      .tech-item {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        background: var(--bg-card);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-md);
        font-size: 0.875rem;
        color: var(--text-secondary);
        transition: all var(--transition-base);

        i {
          font-size: 1.1rem;
        }

        &:hover {
          border-color: var(--accent-primary);
          color: var(--text-primary);
          transform: translateY(-2px);
        }
      }
    }

    .scroll-indicator {
      position: absolute;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      color: var(--text-muted);
      font-size: 0.75rem;
      font-family: var(--font-mono);
      z-index: 1;

      .mouse {
        width: 24px;
        height: 36px;
        border: 2px solid var(--text-muted);
        border-radius: 12px;
        position: relative;

        .wheel {
          width: 4px;
          height: 8px;
          background: var(--accent-primary);
          border-radius: 2px;
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          animation: scrollWheel 1.8s ease-in-out infinite;
        }
      }
    }

    @keyframes scrollWheel {
      0%, 100% { top: 8px; opacity: 1; }
      50% { top: 18px; opacity: 0; }
    }

    /* ---- Stats Section ---- */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
    }

    @media (max-width: 768px) {
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
    }

    /* ---- About Section ---- */
    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 64px;
      align-items: center;
    }

    @media (max-width: 768px) {
      .about-grid { grid-template-columns: 1fr; gap: 40px; }
    }

    .about-code-block {
      background: var(--bg-secondary);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-lg);
    }

    .code-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      background: rgba(255,255,255,0.03);
      border-bottom: 1px solid var(--border-subtle);
    }

    .code-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;

      &.red { background: #ff5f56; }
      &.yellow { background: #ffbd2e; }
      &.green { background: #27c93f; }
    }

    .code-filename {
      margin-left: 8px;
      font-size: 0.75rem;
      color: var(--text-muted);
      font-family: var(--font-mono);
    }

    .code-body {
      padding: 20px;
      margin: 0;
      overflow-x: auto;
      font-family: var(--font-mono);
      font-size: 0.8125rem;
      line-height: 1.8;
      color: var(--text-secondary);
    }

    .code-kw { color: #c678dd; }
    .code-class { color: #e5c07b; }
    .code-str { color: #98c379; }
    .code-func { color: #61afef; }

    .about-text {
      color: var(--text-secondary);
      line-height: 1.8;
      margin-bottom: 16px;
      font-size: 0.9375rem;
    }

    .about-highlights {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 24px;
    }

    .highlight-item {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.875rem;
      color: var(--text-primary);

      i {
        color: var(--accent-primary);
        font-size: 1rem;
      }
    }

    /* ---- Skills Section ---- */
    .skills-category-tabs {
      display: flex;
      gap: 8px;
      justify-content: center;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }

    .category-tab {
      padding: 10px 24px;
      border-radius: var(--radius-md);
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      color: var(--text-secondary);
      font-family: var(--font-sans);
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all var(--transition-base);

      &:hover {
        border-color: var(--border-hover);
        color: var(--text-primary);
      }

      &.active {
        background: var(--accent-gradient);
        border-color: transparent;
        color: var(--text-inverse);
        box-shadow: 0 4px 16px rgba(0, 212, 170, 0.3);
      }
    }

    .skills-grid {
      max-width: 800px;
      margin: 0 auto;
    }

    /* ---- Case Study Card ---- */
    .case-study-card {
      .case-study-header {
        margin-bottom: 16px;
      }

      .case-study-title {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 12px;
        color: var(--text-primary);
      }

      .case-study-problem,
      .case-study-solution {
        font-size: 0.875rem;
        color: var(--text-secondary);
        line-height: 1.7;
        margin-bottom: 12px;

        strong {
          color: var(--text-primary);
        }
      }

      .case-study-footer {
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid var(--border-subtle);
      }

      .case-study-impact {
        margin-top: 12px;
        font-size: 0.8125rem;
        color: var(--accent-primary);
        font-weight: 500;

        i {
          margin-right: 6px;
        }
      }
    }

    /* ---- CTA Section ---- */
    .cta-section {
      padding-bottom: 100px;
    }

    .cta-box {
      background: var(--accent-gradient-soft);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-xl);
      padding: 64px;
      text-align: center;
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(0,212,170,0.05) 0%, transparent 60%);
        animation: rotate 20s linear infinite;
      }
    }

    @keyframes rotate {
      to { transform: rotate(360deg); }
    }

    .cta-content {
      position: relative;
      z-index: 1;
    }

    .cta-title {
      font-size: clamp(1.75rem, 3vw, 2.5rem);
      font-weight: 700;
      margin-bottom: 16px;
      line-height: 1.2;
    }

    .cta-desc {
      color: var(--text-secondary);
      max-width: 520px;
      margin: 0 auto 32px;
      font-size: 1.0625rem;
      line-height: 1.7;
    }

    .cta-actions {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
    }

    @media (max-width: 768px) {
      .cta-box { padding: 40px 24px; }
    }

    /* Timeline description text */
    .timeline-desc {
      color: var(--text-secondary);
      font-size: 0.875rem;
      line-height: 1.6;
      margin-bottom: 8px;
    }

    .timeline-tags {
      margin-top: 8px;
    }
  `]
})
export class HomeComponent implements OnInit, OnDestroy {
  experiences: Experience[] = [];
  projects: Project[] = [];
  skills: Skill[] = [];
  certifications: Certification[] = [];
  testimonials: Testimonial[] = [];
  blogs: Blog[] = [];
  caseStudies: CaseStudy[] = [];

  skillCategories: string[] = ['All', 'Backend', 'Frontend', 'Cloud', 'Databases', 'Tools'];
  selectedSkillCategory = 'All';

  stats = [
    { value: 10, label: 'Years Experience' },
    { value: 50, label: 'Projects Delivered' },
    { value: 15, label: 'Certifications' },
    { value: 99, label: 'Client Satisfaction %' }
  ];

  private subs: Subscription[] = [];

  constructor(
    private expService: ExperienceService,
    private projService: ProjectService,
    private skillService: SkillService,
    private certService: CertificationService,
    private testService: TestimonialService,
    private blogService: BlogService,
    private csService: CaseStudyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadAllData();
    this.setupScrollReveal();
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

  private loadAllData() {
    this.subs.push(this.expService.getAll().subscribe(data => this.experiences = data));
    this.subs.push(this.projService.getAll().subscribe(data => this.projects = data));
    this.subs.push(this.skillService.getAll().subscribe(data => this.skills = data));
    this.subs.push(this.certService.getAll().subscribe(data => this.certifications = data));
    this.subs.push(this.testService.getAll().subscribe(data => this.testimonials = data));
    this.subs.push(this.blogService.getAll().subscribe(data => this.blogs = data));
    this.subs.push(this.csService.getAll().subscribe(data => this.caseStudies = data));
  }

  get filteredSkills(): Skill[] {
    if (this.selectedSkillCategory === 'All') return this.skills;
    return this.skills.filter(s => s.category === this.selectedSkillCategory);
  }

  splitTech(tech: string): string[] {
    return tech.split(/[,;]/).map(t => t.trim()).filter(t => t);
  }

  splitTags(tags: string): string[] {
    return tags.split(/[,;]/).map(t => t.trim()).filter(t => t);
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  }

  @HostListener('window:scroll')
  private setupScrollReveal() {
    // Called on scroll - reveal elements
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
      const top = el.getBoundingClientRect().top;
      const visible = 150;
      if (top < window.innerHeight - visible) {
        el.classList.add('revealed');
      }
    });
  }
}
