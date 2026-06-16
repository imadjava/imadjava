package com.example.portfolio.service;

import com.example.portfolio.dto.ExperienceDto;

import java.util.List;

public interface ExperienceService {
    ExperienceDto create(ExperienceDto dto);
    ExperienceDto update(Long id, ExperienceDto dto);
    void delete(Long id);
    ExperienceDto getById(Long id);
    List<ExperienceDto> listAll();
}

