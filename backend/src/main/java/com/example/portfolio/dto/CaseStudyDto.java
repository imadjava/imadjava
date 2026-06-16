package com.example.portfolio.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CaseStudyDto {
    private Long id;
    private String title;
    private String industry;
    private String businessProblem;
    private String technicalChallenges;
    private String solutionArchitecture;
    private String technologiesUsed;
    private String myContributions;
    private String businessImpact;
    private String lessonsLearned;
}

