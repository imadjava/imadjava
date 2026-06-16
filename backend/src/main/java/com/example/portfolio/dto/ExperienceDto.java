package com.example.portfolio.dto;

import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExperienceDto {
    private Long id;
    private String companyName;
    private String designation;
    private LocalDate startDate;
    private LocalDate endDate;
    private String responsibilities;
    private String achievements;
}

