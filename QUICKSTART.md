# Quick Start Guide (5 minutes)

Get the portfolio app running locally in minutes!

## Fastest Way (Docker Compose)

### Step 1: Prerequisites
- Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Git installed

### Step 2: Clone and Run

```bash
# Clone repository
git clone <repo-url>
cd imadjava

# Start all services (first time takes ~2-3 min to build)
docker compose up --build

# Wait for output: "nginx started"
```

### Step 3: Create Admin Account

In a **new terminal** (keep docker compose running):

```bash
# Register admin
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"demo123"}'

# Response: {"status":"created"}
```

### Step 4: Test the Application

**Backend API** (Swagger UI):
```
http://localhost:8080/swagger-ui.html
```

**Frontend** (Homepage):
```
http://localhost
```

**Admin Panel** (Manage Content):
1. Go to `http://localhost/auth/login`
2. Username: `admin`
3. Password: `demo123`
4. Navigate to `http://localhost/admin/experiences`

**API Endpoint Examples**:
```bash
# List experiences
curl http://localhost:8080/api/v1/experiences

# Login to get token
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"demo123"}'

# Create experience (replace TOKEN with response from login)
curl -X POST http://localhost:8080/api/v1/experiences \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "companyName":"Tech Corp",
    "designation":"Senior Developer",
    "responsibilities":"Led backend services",
    "achievements":"Improved performance by 40%"
  }'
```

## Stop the Application

```bash
# In the terminal where docker compose is running
Ctrl + C

# Or from another terminal
docker compose down
```

## Clean Up (Remove Everything)

```bash
docker compose down -v  # -v removes volumes (database)
```

---

## Local Development (Without Docker)

### Backend Only

**Prerequisites**: Java 21, PostgreSQL 15+, Maven

```bash
# Start PostgreSQL
# Make sure it's running on port 5432

# Update backend/src/main/resources/application.yml with your DB credentials

# Build backend
cd backend
mvn clean package

# Run backend
java -jar target/portfolio-backend-0.0.1-SNAPSHOT.jar

# Backend available at: http://localhost:8080
```

### Frontend Only

**Prerequisites**: Node.js 18+, Angular CLI

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start

# Frontend available at: http://localhost:4200
```

---

## Common Issues

### Port 80 or 8080 Already in Use

**Error**: `bind: address already in use`

**Solution**:
```bash
# Find process using port 8080
lsof -i :8080

# Kill the process
kill -9 <PID>

# Or change port in docker-compose.yml
ports:
  - 8081:8080  # Use 8081 instead
```

### Docker Compose Build Fails

```bash
# Clean rebuild
docker compose down -v
docker system prune -a
docker compose up --build
```

### PostgreSQL Connection Error

```bash
# Check if database is running
docker compose ps

# View logs
docker compose logs db

# Rebuild database
docker compose down -v
docker compose up --build
```

### Can't Login to Admin Panel

1. Verify admin account was created:
```bash
curl http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"demo123"}'
```

2. If you forgot credentials, restart with fresh database:
```bash
docker compose down -v
docker compose up
# Create new admin account again
```

---

## Next Steps

1. **Add Your Content**:
   - Login to admin panel
   - Add your experiences, projects, skills

2. **Customize**:
   - Update styles in `frontend/src/styles.scss`
   - Change text in `frontend/src/app/pages/home/`
   - Add your profile photo

3. **Deploy**:
   - See [DEPLOYMENT.md](./DEPLOYMENT.md) for cloud deployment
   - Get your own domain
   - Enable HTTPS

4. **Extend**:
   - Add more backend entities following the Experience pattern
   - Build more Angular components
   - Add email notifications, file uploads, etc.

---

## Support

For detailed information, see:
- [README.md](./README.md) - Full documentation
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [backend/README.md](./backend/README.md) - Backend-specific info
- [frontend/README.md](./frontend/README.md) - Frontend-specific info

Happy building! 🚀

