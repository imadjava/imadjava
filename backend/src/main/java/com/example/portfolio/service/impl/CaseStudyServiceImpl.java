package com.example.portfolio.service.impl;

import com.example.portfolio.domain.CaseStudy;
import com.example.portfolio.dto.CaseStudyDto;
import com.example.portfolio.mapper.CaseStudyMapper;
import com.example.portfolio.repository.CaseStudyRepository;
import com.example.portfolio.service.CaseStudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CaseStudyServiceImpl extends AbstractCrudService<CaseStudyDto, CaseStudy, CaseStudyRepository> implements CaseStudyService {
    public CaseStudyServiceImpl(CaseStudyRepository repository, CaseStudyMapper mapper) {
        super(repository, mapper);
    }

    @Override
    public List<CaseStudyDto> listByIndustry(String industry) {
        return repository.findByIndustry(industry).stream().map(mapper::toDto).collect(Collectors.toList());
    }
}

