package com.example.portfolio.web;

import com.example.portfolio.dto.CertificationDto;
import com.example.portfolio.service.CertificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/certifications")
public class CertificationController extends GenericCrudController<CertificationDto> {
    public CertificationController(CertificationService service) {
        super(service);
    }
}

