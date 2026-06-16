package com.example.portfolio.mapper;

import com.example.portfolio.domain.Project;
import com.example.portfolio.dto.ProjectDto;
import com.example.portfolio.service.impl.AbstractCrudService;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProjectMapper extends AbstractCrudService.CrudMapper<ProjectDto, Project> {
    ProjectDto toDto(Project e);
    Project toEntity(ProjectDto dto);
}

