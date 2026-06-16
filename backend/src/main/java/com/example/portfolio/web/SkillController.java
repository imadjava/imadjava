package com.example.portfolio.web;

import com.example.portfolio.dto.SkillDto;
import com.example.portfolio.service.SkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/skills")

public class SkillController extends GenericCrudController<SkillDto> {
    private final SkillService skillService;

    public SkillController(SkillService service) {
        super(service);
        this.skillService = service;
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<SkillDto>> getByCategory(@PathVariable String category) {
        return ResponseEntity.ok(skillService.listByCategory(category));
    }
}

