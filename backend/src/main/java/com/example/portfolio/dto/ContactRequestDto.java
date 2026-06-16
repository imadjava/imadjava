package com.example.portfolio.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContactRequestDto {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String company;
    private String message;
    private LocalDateTime createdAt;
    private Boolean processed;
}

