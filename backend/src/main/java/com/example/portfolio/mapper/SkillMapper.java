package com.example.portfolio.mapper;

import com.example.portfolio.domain.Skill;
import com.example.portfolio.dto.SkillDto;
import com.example.portfolio.service.impl.AbstractCrudService;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SkillMapper extends AbstractCrudService.CrudMapper<SkillDto, Skill> {
    SkillDto toDto(Skill e);
    Skill toEntity(SkillDto dto);
}

