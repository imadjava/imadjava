package com.example.portfolio.dto;

import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CertificationDto {
    private Long id;
    private String name;
    private String provider;
    private LocalDate issueDate;
    private String credentialUrl;
}

