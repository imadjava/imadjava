package com.example.portfolio.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "case_studies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CaseStudy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String industry;
    @Column(length = 2000)
    private String businessProblem;
    @Column(length = 2000)
    private String technicalChallenges;
    @Column(length = 3000)
    private String solutionArchitecture;
    private String technologiesUsed;
    @Column(length = 2000)
    private String myContributions;
    @Column(length = 1500)
    private String businessImpact;
    @Column(length = 2000)
    private String lessonsLearned;
}

