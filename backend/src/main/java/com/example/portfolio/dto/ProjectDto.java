package com.example.portfolio.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectDto {
    private Long id;
    private String title;
    private String description;
    private String technologies;
    private String screenshots;
    private String githubUrl;
    private String liveUrl;
    private String businessImpact;
}

