package com.example.portfolio.mapper;

import com.example.portfolio.domain.Testimonial;
import com.example.portfolio.dto.TestimonialDto;
import com.example.portfolio.service.impl.AbstractCrudService;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TestimonialMapper extends AbstractCrudService.CrudMapper<TestimonialDto, Testimonial> {
    TestimonialDto toDto(Testimonial e);
    Testimonial toEntity(TestimonialDto dto);
}

