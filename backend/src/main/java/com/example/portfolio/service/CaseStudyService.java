package com.example.portfolio.service;

import com.example.portfolio.dto.CaseStudyDto;

import java.util.List;

public interface CaseStudyService extends GenericCrudService<CaseStudyDto> {
    List<CaseStudyDto> listByIndustry(String industry);
}

