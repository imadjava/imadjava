# Deployment Guide

This guide provides step-by-step instructions for deploying the portfolio application to various platforms.

## Prerequisites

- Docker & Docker Compose installed
- Git
- Access to a cloud provider account (AWS, GCP, Azure, etc.) or a VPS
- Domain name (optional but recommended)
- SSL certificate (optional but recommended for HTTPS)

## Local Docker Deployment (Testing)

```bash
git clone <repo>
cd imadjava

# Build images
docker compose build

# Run services
docker compose up

# In a new terminal, create admin account
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"MySecurePassword123"}'

# Visit http://localhost
# Admin login at http://localhost/auth/login
```

## AWS Deployment (ECS Fargate)

### 1. Build and Push Images to ECR

```bash
# Create ECR repositories
aws ecr create-repository --repository-name portfolio-backend --region us-east-1
aws ecr create-repository --repository-name portfolio-frontend --region us-east-1

# Get ECR login token
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com

# Build and push backend
docker build -t <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/portfolio-backend:latest ./backend
docker push <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/portfolio-backend:latest

# Build and push frontend
docker build -t <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/portfolio-frontend:latest ./frontend
docker push <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/portfolio-frontend:latest
```

### 2. Create RDS PostgreSQL Database

```bash
aws rds create-db-instance \
  --db-instance-identifier portfolio-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username admin \
  --master-user-password <STRONG_PASSWORD> \
  --allocated-storage 20
```

### 3. Create ECS Cluster and Services

```bash
# Create cluster
aws ecs create-cluster --cluster-name portfolio

# Register task definitions and create services (see AWS documentation for full syntax)
```

### 4. Configure LoadBalancer

- Create Application Load Balancer
- Point to ECS services
- Configure security groups for ports 80, 443, 8080

## Docker Hub Deployment

### 1. Build and Push to Docker Hub

```bash
# Build images
docker build -t yourname/portfolio-backend:latest ./backend
docker build -t yourname/portfolio-frontend:latest ./frontend

# Push to Docker Hub
docker push yourname/portfolio-backend:latest
docker push yourname/portfolio-frontend:latest
```

### 2. Deploy on VPS with Docker Compose

```bash
# SSH into VPS
ssh user@your-vps-ip

# Create app directory
mkdir -p ~/portfolio
cd ~/portfolio

# Create docker-compose.yml with your images
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: portfolio_db
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: <SECURE_PASSWORD>
    volumes:
      - db-data:/var/lib/postgresql/data
    restart: always

  backend:
    image: yourname/portfolio-backend:latest
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/portfolio_db
      SPRING_DATASOURCE_USERNAME: admin
      SPRING_DATASOURCE_PASSWORD: <SECURE_PASSWORD>
      APP_JWT_SECRET: <32_CHAR_RANDOM_STRING>
    depends_on:
      - db
    restart: always

  frontend:
    image: yourname/portfolio-frontend:latest
    restart: always

  nginx:
    image: nginx:stable
    ports:
      - 80:80
      - 443:443
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/conf.d/default.conf:ro
      - /etc/letsencrypt:/etc/letsencrypt:ro
    depends_on:
      - backend
      - frontend
    restart: always

volumes:
  db-data:
EOF

# Start services
docker compose up -d
```

### 3. Setup SSL/HTTPS with Let's Encrypt

```bash
# Install Certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Update nginx configuration to use SSL
# Modify nginx/nginx.conf to listen on 443 and reference certificate paths
```

## Kubernetes Deployment

### 1. Create Kubernetes Manifests

```yaml
# backend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: portfolio-backend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: portfolio-backend
  template:
    metadata:
      labels:
        app: portfolio-backend
    spec:
      containers:
      - name: backend
        image: yourname/portfolio-backend:latest
        ports:
        - containerPort: 8080
        env:
        - name: SPRING_DATASOURCE_URL
          value: "jdbc:postgresql://db-service:5432/portfolio_db"
        - name: SPRING_DATASOURCE_USERNAME
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: username
        - name: SPRING_DATASOURCE_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: password
        - name: APP_JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: jwt-secret
              key: secret
```

### 2. Deploy to Kubernetes

```bash
# Create secrets
kubectl create secret generic db-credentials --from-literal=username=admin --from-literal=password=<secure-pwd>
kubectl create secret generic jwt-secret --from-literal=secret=<32-char-key>

# Apply manifests
kubectl apply -f backend-deployment.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f db-statefulset.yaml
kubectl apply -f nginx-configmap.yaml
kubectl apply -f services.yaml

# Create ingress for external access
kubectl apply -f ingress.yaml
```

## Environment Variables Checklist

```env
# Critical (change from defaults)
APP_JWT_SECRET=<generate-random-32-char-string>
SPRING_DATASOURCE_PASSWORD=<strong-password>

# Database
SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/portfolio_db
SPRING_DATASOURCE_USERNAME=admin

# API (if using custom domain)
API_URL=https://yourdomain.com

# Optional
APP_JWT_EXPIRATION_MS=86400000
SPRING_JPA_HIBERNATE_DDL_AUTO=validate
```

## Health Checks

```bash
# Check backend health
curl http://localhost:8080/api/v1/experiences

# Check frontend
curl http://localhost

# Check API docs
curl http://localhost:8080/swagger-ui.html
```

## Monitoring & Logging

### Docker Logs
```bash
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f db
```

### Performance Monitoring
- Enable Spring Boot Actuator for metrics
- Configure Prometheus scraping
- Use Grafana for visualization

## Backup Strategy

### PostgreSQL Backup
```bash
# Backup
docker compose exec db pg_dump -U admin portfolio_db > backup.sql

# Restore
docker compose exec -T db psql -U admin portfolio_db < backup.sql
```

### Automated Backups (AWS RDS)
- Enable automated backups (7-day retention minimum)
- Configure backup window (during low-traffic hours)
- Test restore procedure

## Scaling Considerations

1. **Database**: Use read replicas for high read volume
2. **Backend**: Use multiple instances behind load balancer
3. **Frontend**: CDN distribution for static files
4. **Caching**: Add Redis for session/data caching
5. **Search**: Add Elasticsearch if needed for blog search

## Cost Optimization

- Use spot instances for non-critical workloads
- Auto-scaling based on CPU/memory usage
- Reserved instances for baseline load
- CDN for frontendresources

## Troubleshooting Deployment

### Services won't start
```bash
# Check logs
docker compose logs --tail=100

# Check network
docker network ls
docker inspect <network-id>
```

### Database connection issues
```bash
# Test PostgreSQL connection
docker compose exec db psql -U admin -d portfolio_db -c "SELECT 1"

# Check environment variables
docker compose config | grep DATASOURCE
```

### Frontend not loading
```bash
# Check nginx logs
docker compose logs nginx

# Verify frontend files
docker compose exec frontend ls -la /usr/share/nginx/html
```

---

For production deployments, always:
1. Test in staging environment first
2. Secure all secrets (never commit to git)
3. Enable monitoring and alerting
4. Document any custom configurations
5. Plan backup and disaster recovery procedures

