package com.example.portfolio.web;

import com.example.portfolio.dto.CaseStudyDto;
import com.example.portfolio.service.CaseStudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/case-studies")

public class CaseStudyController extends GenericCrudController<CaseStudyDto> {
    private final CaseStudyService caseStudyService;

    public CaseStudyController(CaseStudyService service) {
        super(service);
        this.caseStudyService = service;
    }

    @GetMapping("/industry/{industry}")
    public ResponseEntity<List<CaseStudyDto>> getByIndustry(@PathVariable String industry) {
        return ResponseEntity.ok(caseStudyService.listByIndustry(industry));
    }
}

