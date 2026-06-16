-- Sample experiences
INSERT INTO experiences(company_name, designation, start_date, end_date, responsibilities, achievements)
VALUES ('Acme Corp', 'Senior Java Developer', '2019-06-01', '2022-08-31', 'Led backend services, designed microservices, mentored team', 'Reduced latency by 40%');

-- Sample projects
INSERT INTO projects(title, description, technologies, github_url, business_impact)
VALUES ('E-Commerce Microservices', 'Built scalable microservices for enterprise e-commerce platform', 'Java, Spring Boot, Docker, Kubernetes', 'https://github.com/example', 'Increased throughput by 3x');

-- Sample skills
INSERT INTO skills(name, category, proficiency) VALUES
('Java', 'Backend', 5),
('Spring Boot', 'Backend', 5),
('Angular', 'Frontend', 4),
('PostgreSQL', 'Databases', 4),
('Docker', 'DevOps', 4),
('Kubernetes', 'DevOps', 3);

-- Sample certifications
INSERT INTO certifications(name, provider, issue_date, credential_url)
VALUES ('AWS Solutions Architect Associate', 'Amazon', '2022-01-15', 'https://aws.amazon.com');

-- Sample blogs
INSERT INTO blogs(title, content, category, tags, created_at, updated_at)
VALUES ('Building Scalable Java Applications', 'This article discusses best practices for building scalable Java applications using Spring Boot and microservices architecture.', 'Java', 'spring,microservices', NOW(), NOW());

-- Sample testimonials
INSERT INTO testimonials(client_name, company, testimonial, position)
VALUES ('John Smith', 'Tech Corp', 'Excellent developer with deep Java expertise', 'CTO');

-- Sample case study
INSERT INTO case_studies(title, industry, business_problem, technical_challenges, solution_architecture, technologies_used, my_contributions, business_impact, lessons_learned)
VALUES ('Airline Ticket Exchange Modernization', 'Aviation', 'Legacy system integration', 'Complex XML transformations and SOAP services', 'Microservices with REST APIs', 'Java, Spring Boot, XSLT', 'Led architecture and implementation', 'Improved processing time by 50%', 'API-first design is crucial');

