package com.example.portfolio.web;

import com.example.portfolio.dto.ProjectDto;
import com.example.portfolio.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/projects")
public class ProjectController extends GenericCrudController<ProjectDto> {
    public ProjectController(ProjectService service) {
        super(service);
    }
}

