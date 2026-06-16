package com.example.portfolio.service;

import com.example.portfolio.dto.SkillDto;

import java.util.List;

public interface SkillService extends GenericCrudService<SkillDto> {
    List<SkillDto> listByCategory(String category);
}

