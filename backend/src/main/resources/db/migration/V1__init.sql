-- Flyway initial schema for portfolio

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE user_roles (
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL
);

CREATE TABLE experiences (
  id BIGSERIAL PRIMARY KEY,
  company_name VARCHAR(255),
  designation VARCHAR(255),
  start_date DATE,
  end_date DATE,
  responsibilities TEXT,
  achievements TEXT
);

CREATE TABLE projects (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255),
  description VARCHAR(2000),
  technologies VARCHAR(1000),
  screenshots VARCHAR(4000),
  github_url VARCHAR(255),
  live_url VARCHAR(255),
  business_impact VARCHAR(1000)
);

CREATE TABLE skills (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255),
  category VARCHAR(255),
  proficiency INTEGER
);

CREATE TABLE certifications (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255),
  provider VARCHAR(255),
  issue_date DATE,
  credential_url VARCHAR(500)
);

CREATE TABLE blogs (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255),
  content VARCHAR(5000),
  category VARCHAR(255),
  tags VARCHAR(255),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE testimonials (
  id BIGSERIAL PRIMARY KEY,
  client_name VARCHAR(255),
  company VARCHAR(255),
  testimonial VARCHAR(2000),
  position VARCHAR(255)
);

CREATE TABLE contact_requests (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  company VARCHAR(255),
  message VARCHAR(4000),
  created_at TIMESTAMP,
  processed BOOLEAN DEFAULT false
);

CREATE TABLE case_studies (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255),
  industry VARCHAR(255),
  business_problem VARCHAR(2000),
  technical_challenges VARCHAR(2000),
  solution_architecture VARCHAR(3000),
  technologies_used VARCHAR(500),
  my_contributions VARCHAR(2000),
  business_impact VARCHAR(1500),
  lessons_learned VARCHAR(2000)
);

