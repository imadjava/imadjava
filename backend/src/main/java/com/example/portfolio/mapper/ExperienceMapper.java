package com.example.portfolio.mapper;

import com.example.portfolio.domain.Experience;
import com.example.portfolio.dto.ExperienceDto;
import com.example.portfolio.service.impl.AbstractCrudService;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ExperienceMapper extends  AbstractCrudService.CrudMapper<ExperienceDto, Experience> {
    ExperienceDto toDto(Experience e);
    Experience toEntity(ExperienceDto dto);
}

