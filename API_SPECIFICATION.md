# API Specification

Complete REST API reference for the Portfolio application.

## Base URL

```
http://localhost:8080/api/v1
```

For production, replace with your domain:
```
https://yourdomain.com/api/v1
```

## Authentication

### Register

Create a new admin account.

```
POST /auth/register
Content-Type: application/json

{
  "username": "admin",
  "password": "SecurePassword123"
}
```

Response (201):
```json
{
  "status": "created"
}
```

### Login

Authenticate and receive JWT token.

```
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "SecurePassword123"
}
```

Response (200):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Use token for authenticated requests:
```
Authorization: Bearer <token>
```

---

## Experiences

### List All

```
GET /experiences
```

Response (200):
```json
[
  {
    "id": 1,
    "companyName": "Acme Corp",
    "designation": "Senior Java Developer",
    "startDate": "2019-06-01",
    "endDate": "2022-08-31",
    "responsibilities": "Led backend services, designed microservices",
    "achievements": "Reduced latency by 40%"
  }
]
```

### Get Single

```
GET /experiences/1
```

### Create (ADMIN only)

```
POST /experiences
Authorization: Bearer <token>
Content-Type: application/json

{
  "companyName": "Tech Corp",
  "designation": "Lead Developer",
  "startDate": "2023-01-01",
  "responsibilities": "Architecture and implementation",
  "achievements": "Improved performance by 50%"
}
```

### Update (ADMIN only)

```
PUT /experiences/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "companyName": "Tech Corp",
  "designation": "Principal Engineer",
  "achievements": "Led cloud migration, improved by 60%"
}
```

### Delete (ADMIN only)

```
DELETE /experiences/1
Authorization: Bearer <token>
```

---

## Projects

### List All

```
GET /projects
```

Response:
```json
[
  {
    "id": 1,
    "title": "E-Commerce Microservices",
    "description": "Built scalable platform",
    "technologies": "Java, Spring Boot, Docker, Kubernetes",
    "githubUrl": "https://github.com/...",
    "liveUrl": "https://example.com",
    "businessImpact": "Increased throughput by 3x"
  }
]
```

### CRUD Operations

- `GET /projects/{id}`
- `POST /projects` (ADMIN)
- `PUT /projects/{id}` (ADMIN)
- `DELETE /projects/{id}` (ADMIN)

---

## Skills

### List All

```
GET /skills
```

Response:
```json
[
  {
    "id": 1,
    "name": "Java",
    "category": "Backend",
    "proficiency": 5
  }
]
```

### Filter by Category

```
GET /skills/category/Backend
```

**Categories**: Backend, Frontend, Cloud, Databases, Tools

### CRUD Operations

- `GET /skills/{id}`
- `POST /skills` (ADMIN)
- `PUT /skills/{id}` (ADMIN)
- `DELETE /skills/{id}` (ADMIN)

---

## Certifications

### List All

```
GET /certifications
```

Response:
```json
[
  {
    "id": 1,
    "name": "AWS Solutions Architect",
    "provider": "Amazon",
    "issueDate": "2022-01-15",
    "credentialUrl": "https://aws.amazon.com/verify/..."
  }
]
```

### CRUD Operations

- `GET /certifications/{id}`
- `POST /certifications` (ADMIN)
- `PUT /certifications/{id}` (ADMIN)
- `DELETE /certifications/{id}` (ADMIN)

---

## Blogs

### List All

```
GET /blogs
```

Response:
```json
[
  {
    "id": 1,
    "title": "Building Scalable Java Applications",
    "content": "This article discusses...",
    "category": "Java",
    "tags": "spring,microservices",
    "createdAt": "2024-01-15T10:30:00",
    "updatedAt": "2024-01-15T10:30:00"
  }
]
```

### Search by Title

```
GET /blogs/search?title=scalable
```

### Filter by Category

```
GET /blogs/category/Java
```

### CRUD Operations

- `GET /blogs/{id}`
- `POST /blogs` (ADMIN)
- `PUT /blogs/{id}` (ADMIN)
- `DELETE /blogs/{id}` (ADMIN)

---

## Testimonials

### List All

```
GET /testimonials
```

Response:
```json
[
  {
    "id": 1,
    "clientName": "John Smith",
    "company": "Tech Corp",
    "position": "CTO",
    "testimonial": "Excellent developer with deep Java expertise"
  }
]
```

### CRUD Operations

- `GET /testimonials/{id}`
- `POST /testimonials` (ADMIN)
- `PUT /testimonials/{id}` (ADMIN)
- `DELETE /testimonials/{id}` (ADMIN)

---

## Case Studies

### List All

```
GET /case-studies
```

Response:
```json
[
  {
    "id": 1,
    "title": "Airline Ticket Exchange Modernization",
    "industry": "Aviation",
    "businessProblem": "Legacy system integration challenges",
    "technicalChallenges": "Complex XML transformations",
    "solutionArchitecture": "Microservices with REST APIs",
    "technologiesUsed": "Java, Spring Boot, XSLT",
    "myContributions": "Led architecture and implementation",
    "businessImpact": "Improved processing time by 50%",
    "lessonsLearned": "API-first design is crucial"
  }
]
```

### Filter by Industry

```
GET /case-studies/industry/Aviation
```

### CRUD Operations

- `GET /case-studies/{id}`
- `POST /case-studies` (ADMIN)
- `PUT /case-studies/{id}` (ADMIN)
- `DELETE /case-studies/{id}` (ADMIN)

---

## Contact Requests

### Submit Contact Form (Public)

```
POST /contact-requests/submit
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+1-555-0123",
  "company": "Example Inc",
  "message": "Interested in your services for our project"
}
```

Response (200):
```json
{
  "id": 1,
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+1-555-0123",
  "company": "Example Inc",
  "message": "Interested in your services...",
  "createdAt": "2024-01-15T14:20:00",
  "processed": false
}
```

### List Unprocessed (ADMIN)

```
GET /contact-requests/unprocessed
Authorization: Bearer <token>
```

### Mark as Processed (ADMIN)

```
POST /contact-requests/1/mark-processed
Authorization: Bearer <token>
```

### View All (ADMIN)

```
GET /contact-requests
Authorization: Bearer <token>
```

### CRUD Operations

- `GET /contact-requests/{id}` (ADMIN)
- `POST /contact-requests` (ADMIN, use submit endpoint for public)
- `PUT /contact-requests/{id}` (ADMIN)
- `DELETE /contact-requests/{id}` (ADMIN)

---

## Error Responses

### Unauthorized (401)

```
{
  "error": "Unauthorized"
}
```

### Forbidden (403)

```
{
  "error": "Access Denied"
}
```

### Not Found (404)

```
{
  "error": "Not found"
}
```

### Bad Request (400)

```
{
  "error": "validation_failed"
}
```

### Internal Server Error (500)

```
{
  "error": "Internal server error message"
}
```

---

## Rate Limiting

Currently not enforced, but recommended for production:
- 100 requests/minute for public endpoints
- 1000 requests/minute for authenticated endpoints

---

## CORS

Configured at Nginx level in reverse proxy.

**Allowed Origins**: From your domain\n**Allowed Methods**: GET, POST, PUT, DELETE, OPTIONS\n**Allowed Headers**: Content-Type, Authorization\n

---

## API Documentation

Interactive API documentation available at:
```
http://localhost:8080/swagger-ui.html
```

OpenAPI schema:
```
http://localhost:8080/v3/api-docs
```

---

## Code Examples

### cURL - List Experiences

```bash
curl -X GET http://localhost:8080/api/v1/experiences \
  -H "Content-Type: application/json"
```

### cURL - Create Experience (Authenticated)

```bash
TOKEN="eyJ..."

curl -X POST http://localhost:8080/api/v1/experiences \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "companyName": "My Company",
    "designation": "Senior Developer",
    "responsibilities": "Full stack development",
    "achievements": "Led modernization"
  }'
```

### JavaScript/Fetch

```javascript
// Get token
const loginResponse = await fetch('http://localhost:8080/api/v1/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'admin', password: 'password' })
});
const { token } = await loginResponse.json();

// Create experience
const createResponse = await fetch('http://localhost:8080/api/v1/experiences', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    companyName: 'Tech Corp',
    designation: 'Lead Developer'
  })
});
const newExperience = await createResponse.json();
console.log(newExperience);
```

### Angular/TypeScript

```typescript
constructor(private http: HttpClient) {}

createExperience(exp: ExperienceDto) {
  return this.http.post('/api/v1/experiences', exp);
}
```

---

## Pagination (Future Enhancement)

Ready for implementation:
```
GET /experiences?page=0&size=10&sort=id,desc
```

---

## Version Control

Current API version: **v1**\nEndpoint pattern: `/api/v1/**`\nFuture versions: `/api/v2/**` (backward compatible)

---
\n**For live API testing, use Swagger UI at the /swagger-ui.html endpoint.**

*** End Patch
