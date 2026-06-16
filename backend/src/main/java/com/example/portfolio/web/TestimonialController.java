package com.example.portfolio.web;

import com.example.portfolio.dto.TestimonialDto;
import com.example.portfolio.service.TestimonialService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/testimonials")
public class TestimonialController extends GenericCrudController<TestimonialDto> {
    public TestimonialController(TestimonialService service) {
        super(service);
    }
}

