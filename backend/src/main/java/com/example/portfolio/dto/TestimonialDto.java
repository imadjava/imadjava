package com.example.portfolio.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TestimonialDto {
    private Long id;
    private String clientName;
    private String company;
    private String testimonial;
    private String position;
}

