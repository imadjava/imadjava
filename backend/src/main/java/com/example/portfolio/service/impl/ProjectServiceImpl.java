package com.example.portfolio.service.impl;

import com.example.portfolio.domain.Project;
import com.example.portfolio.dto.ProjectDto;
import com.example.portfolio.mapper.ProjectMapper;
import com.example.portfolio.repository.ProjectRepository;
import com.example.portfolio.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ProjectServiceImpl extends AbstractCrudService<ProjectDto, Project, ProjectRepository> implements ProjectService {
    public ProjectServiceImpl(ProjectRepository repository, ProjectMapper mapper) {
        super(repository, mapper);
    }
}

