package com.example.portfolio.mapper;

import com.example.portfolio.domain.CaseStudy;
import com.example.portfolio.dto.CaseStudyDto;
import com.example.portfolio.service.impl.AbstractCrudService;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CaseStudyMapper extends AbstractCrudService.CrudMapper<CaseStudyDto, CaseStudy> {

    @Override
    CaseStudyDto toDto(CaseStudy e);

    @Override
    CaseStudy toEntity(CaseStudyDto dto);
}
