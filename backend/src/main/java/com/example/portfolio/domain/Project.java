package com.example.portfolio.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "projects")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    @Column(length = 2000)
    private String description;
    @Column(length = 1000)
    private String technologies;
    @Column(length = 4000)
    private String screenshots;
    private String githubUrl;
    private String liveUrl;
    @Column(length = 1000)
    private String businessImpact;
}

