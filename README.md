# Personal Portfolio - Full Stack (Java + Angular)

This repository is a production-ready scaffold for a Senior Java Full Stack Developer personal portfolio website.

## Features

- **Backend**: Java 21, Spring Boot 3, Spring Data JPA, Spring Security (JWT), Flyway, MapStruct, Lombok
- **Frontend**: Angular 16 (fully scaffolded), lazy-loaded modules, Material design, responsive layouts
- **Database**: PostgreSQL with Flyway migrations
- **DevOps**: Docker, Docker Compose, Nginx reverse proxy
- **CI/CD**: GitHub Actions (build, test, Docker)
- **API**: OpenAPI/Swagger documentation, comprehensive CRUD endpoints
- **Security**: JWT authentication, role-based access control (ADMIN role), password encryption

## Project Structure

```
imadjava/
├── backend/                # Spring Boot application
│   ├── src/
│   │   ├── main/java/com/example/portfolio/
│   │   │   ├── domain/           # JPA entities
│   │   │   ├── dto/               # Data transfer objects
│   │   │   ├── mapper/            # MapStruct mappers
│   │   │   ├── repository/        # Spring Data repositories
│   │   │   ├── service/           # Business logic
│   │   │   ├── web/               # REST controllers
│   │   │   ├── security/          # JWT, security config
│   │   │   ├── exception/         # Global exception handling
│   │   │   └── config/            # Spring configuration (OpenAPI, etc.)
│   │   ├── resources/
│   │   │   ├── db/migration/      # Flyway migrations
│   │   │   └── application.yml
│   │   └── test/                  # Unit & integration tests
│   ├── pom.xml
│   ├── Dockerfile
│   └── README.md
├── frontend/               # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── pages/              # Routable pages
│   │   │   ├── modules/            # Feature modules (lazy-loaded)
│   │   │   │   ├── auth/           # Login/register
│   │   │   │   ├── admin/          # Admin portal (CRUD management)
│   │   │   │   ├── projects/       # Projects listing
│   │   │   │   ├── blog/           # Blog articles
│   │   │   │   └── contact/        # Contact form
│   │   │   ├── services/           # API services, auth service
│   │   │   ├── interceptors/       # JWT token interceptor
│   │   │   ├── guards/             # Route guards (AuthGuard)
│   │   │   └── app.module.ts
│   │   ├── styles.scss             # Global SCSS with CSS variables
│   │   ├── index.html
│   │   └── main.ts
│   ├── package.json
│   ├── angular.json
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── README.md
├── nginx/                  # Nginx configuration
│   └── nginx.conf
├── docker-compose.yml      # Multi-container orchestration
├── .github/workflows/
│   └── ci.yml              # GitHub Actions CI/CD pipeline
├── robots.txt              # SEO
├── sitemap.xml             # SEO
└── README.md               # This file
```

## Entities Implemented

### Backend Domain Models
- **User** - Admin authentication (username, password, roles)
- **Experience** - Work history (company, designation, dates, responsibilities, achievements)
- **Project** - Portfolio projects (title, description, technologies, GitHub/live URLs)
- **Skill** - Technical skills (name, category, proficiency level 1-5)
- **Certification** - Professional certifications (name, provider, date, credential URL)
- **Blog** - Technical blog posts (title, content, category, tags, timestamps)
- **Testimonial** - Client testimonials (client name, company, testimonial, position)
- **ContactRequest** - Contact form submissions (name, email, phone, company, message)
- **CaseStudy** - Enterprise case studies (title, industry, problem, solution, impact, lessons)

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Create admin account
- `POST /api/v1/auth/login` - Login, get JWT token

### Public Endpoints (GET only)
- `GET /api/v1/experiences` - List experiences
- `GET /api/v1/experiences/{id}` - Get single experience
- `GET /api/v1/projects` - List projects
- `GET /api/v1/projects/{id}` - Get single project
- `GET /api/v1/skills` - List all skills
- `GET /api/v1/skills/category/{category}` - Filter by category
- `GET /api/v1/certifications` - List certifications
- `GET /api/v1/blogs` - List blog posts
- `GET /api/v1/blogs/search?title=...` - Search blogs
- `GET /api/v1/blogs/category/{category}` - Filter by category
- `GET /api/v1/testimonials` - List testimonials
- `GET /api/v1/case-studies` - List case studies
- `POST /api/v1/contact-requests/submit` - Submit contact form

### Protected Endpoints (Admin only, POST/PUT/DELETE)
- `POST, PUT, DELETE /api/v1/experiences/**`
- `POST, PUT, DELETE /api/v1/projects/**`
- `POST, PUT, DELETE /api/v1/skills/**`
- `POST, PUT, DELETE /api/v1/certifications/**`
- `POST, PUT, DELETE /api/v1/blogs/**`
- `POST, PUT, DELETE /api/v1/testimonials/**`
- `POST, PUT, DELETE /api/v1/case-studies/**`
- `GET /api/v1/contact-requests/unprocessed` - View contact submissions
- `POST /api/v1/contact-requests/{id}/mark-processed` - Mark as processed

## Getting Started

### Prerequisites
- Docker & Docker Compose (for production-like environment)
- OR: Java 21, Node.js 18+, PostgreSQL 15+ (for local development)

### Option 1: Docker Compose (Recommended)

```bash
# Clone the repository
git clone <repo-url>
cd imadjava

# Build and run all services
docker compose up --build

# First time setup: Register admin account
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"SecurePassword123"}'

# Login to get JWT token
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"SecurePassword123"}'
# Response: {"token": "eyJ..."}

# Access the application
# Frontend: http://localhost
# Backend API: http://localhost:8080/api/v1
# Swagger UI: http://localhost:8080/swagger-ui.html
```

### Option 2: Local Development

#### Backend
```bash
cd backend

# Install dependencies and build
mvn clean package

# Run with default PostgreSQL (update application.yml if needed)
java -jar target/portfolio-backend-0.0.1-SNAPSHOT.jar

# Or run with Maven
mvn spring-boot:run
```

#### Frontend
```bash
cd frontend

# Install dependencies
npm install

# Development server
npm start
# Visit http://localhost:4200

# Build for production
npm run build:prod
# Output in dist/portfolio-frontend/
```

### Option 3: Database Setup (if not using Docker)

```bash
# Create PostgreSQL database
createdb portfolio_db -U postgres

# Update backend/src/main/resources/application.yml with your DB credentials
# Flyway will automatically run migrations on startup
```

## Admin Portal

Access the admin portal at `http://localhost/admin` (after building frontend):

1. Register a new admin account: `http://localhost/auth/register`
2. Login: `http://localhost/auth/login`
3. Manage content:
   - Experiences: Create/edit/delete work history
   - Projects: Add portfolio projects
   - Skills: Manage technical skills by category
   - (Other modules available with same pattern)

## Security

- **JWT Authentication**: Stateless token-based auth
- **Password Hashing**: BCrypt encryption
- **Role-Based Access Control**: ADMIN role for mutations
- **CORS**: Configured via Nginx reverse proxy
- **HTTPS Ready**: Use TLS termination at Nginx in production

### Environment Variables (Production)

```env
# Backend
SPRING_DATASOURCE_URL=jdbc:postgresql://your-db-host:5432/portfolio_db
SPRING_DATASOURCE_USERNAME=<db-user>
SPRING_DATASOURCE_PASSWORD=<db-password>
APP_JWT_SECRET=<secure-random-string-min-32-chars>
APP_JWT_EXPIRATION_MS=86400000

# Frontend (set before build)
API_URL=https://your-api-domain.com
```

## Testing

```bash
# Backend unit tests
cd backend
mvn test

# Backend integration tests
mvn verify

# Frontend tests
cd frontend
npm test
```

## CI/CD Pipeline

GitHub Actions workflow (`.github/workflows/ci.yml`):
1. Trigger on push to `main` or `develop` branches
2. Backend: Build with Maven, run tests
3. Frontend: (Optional) Build and test Angular
4. Docker: Build and push images (on main branch)

## Deployment

### Docker Hub / Container Registry

```bash
# Build images
docker compose build

# Tag and push to registry
docker tag imadjava-backend your-registry/your-org/portfolio-backend:latest
docker tag imadjava-frontend your-registry/your-org/portfolio-frontend:latest
docker push your-registry/your-org/portfolio-backend:latest
docker push your-registry/your-org/portfolio-frontend:latest
```

### Kubernetes / Cloud Platforms

Update `docker-compose.yml` to use remote images, or create Kubernetes manifests:
```bash
# Example for deploying to Kubernetes
kubectl create deployment portfolio-backend --image=your-registry/portfolio-backend:latest
kubectl create service loadbalancer portfolio-backend --tcp=8080:8080
```

### AWS, GCP, Azure, DigitalOcean

Use container services (ECS, Cloud Run, Container Instances, App Platform) with the Docker images.

## Database Migrations

Flyway migrations are in `backend/src/main/resources/db/migration/`:
- `V1__init.sql` - Initial schema (all tables)
- `V2__sample_data.sql` - Sample data for demo

To add new migrations:
1. Create `V3__your_migration.sql` in the migration folder
2. Restart the backend; Flyway runs automatically

## SEO & Public Features

- `robots.txt` - Search engine directives
- `sitemap.xml` - Site map for indexing
- Open Graph meta tags (add in frontend `index.html` for social sharing)
- Structured data (JSON-LD) for projects and case studies
- Mobile-responsive design via Angular Material (planned)

## Frontend Features (implemented/planned)

- ✅ Home page with hero section
- ✅ Admin login/register
- ✅ Admin dashboard for CRUD operations
- ✅ Experience management
- 🔄 Project gallery
- 🔄 Skills display with categories
- 🔄 Blog/articles module
- ✅ Contact form submission
- 🔄 Testimonials carousel
- 🔄 Case studies showcase
- 🔄 Dark/Light theme toggle
- 🔄 Responsive layout (Material Design)

## Extending the Application

### Adding a New Entity

1. **Create domain class** in `backend/src/main/java/com/example/portfolio/domain/`
2. **Create DTO** in `backend/src/main/java/com/example/portfolio/dto/`
3. **Create mapper** in `backend/src/main/java/com/example/portfolio/mapper/` (MapStruct)
4. **Create repository** in `backend/src/main/java/com/example/portfolio/repository/`
5. **Create service interface & implementation** in `backend/src/main/java/com/example/portfolio/service/`
6. **Create controller** in `backend/src/main/java/com/example/portfolio/web/`
7. **Add Flyway migration** in `backend/src/main/resources/db/migration/`
8. **Add frontend service** in `frontend/src/app/services/`
9. **Add admin component** in `frontend/src/app/modules/admin/components/`

Example pattern: See `Experience` entity (complete CRUD example).

## Performance Considerations

- Lazy loading for Angular modules
- JPA lazy loading for related entities
- Database indexing via Flyway migrations
- Caching headers configured at Nginx level
- Angular production build with optimization flags

## Production Checklist

- [ ] Change JWT secret to a secure random value
- [ ] Set strong database password
- [ ] Enable HTTPS/TLS at reverse proxy
- [ ] Configure HSTS, CSP, X-Frame-Options headers
- [ ] Set up automatic backups for PostgreSQL
- [ ] Configure logging and monitoring
- [ ] Test API rate limiting (nginx can be configured)
- [ ] Review security audit (OWASP)
- [ ] Set up automated CI/CD deployment
- [ ] Monitor application health and errors

## Troubleshooting

### Database Connection Error
```
Ensure PostgreSQL is running and connection details in application.yml are correct.
Check Docker Compose logs: docker compose logs db
```

### Port Already in Use
```
docker compose down  # Stop all services
# Or change ports in docker-compose.yml
```

### Login Fails
```
Ensure admin account is registered first.
Check backend logs for authentication errors.
```

### Frontend Doesn't Load
```
Build frontend: cd frontend && npm run build:prod
Ensure Nginx is serving files from /usr/share/nginx/html
```

## License

MIT

## Support

For issues, questions, or contributions, please open an issue on GitHub or contact the maintainer.

---

**Happy coding! This portfolio site is ready to showcase your full-stack expertise to recruiters and clients.**

