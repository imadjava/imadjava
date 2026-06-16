package com.example.portfolio.service.impl;

import com.example.portfolio.domain.Testimonial;
import com.example.portfolio.dto.TestimonialDto;
import com.example.portfolio.mapper.TestimonialMapper;
import com.example.portfolio.repository.TestimonialRepository;
import com.example.portfolio.service.TestimonialService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class TestimonialServiceImpl extends AbstractCrudService<TestimonialDto, Testimonial, TestimonialRepository> implements TestimonialService {
    public TestimonialServiceImpl(TestimonialRepository repository, TestimonialMapper mapper) {
        super(repository, mapper);
    }
}

