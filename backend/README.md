# Backend (Spring Boot)

This is the Spring Boot backend for the portfolio site. It includes JWT auth skeleton, Flyway migrations, and an example Experience module.

Run locally with Maven:

1. Configure a local PostgreSQL database (or use Docker Compose) and update `src/main/resources/application.yml`.
2. Build and run:

   mvn clean package
   java -jar target/portfolio-backend-0.0.1-SNAPSHOT.jar

Docker (with docker-compose):

   docker compose up --build

API examples:

- GET /api/v1/experiences - list experiences
- POST /api/v1/auth/register - create admin (body: {"username":"admin","password":"secret"})
- POST /api/v1/auth/login - get token (body: {"username":"admin","password":"secret"})

