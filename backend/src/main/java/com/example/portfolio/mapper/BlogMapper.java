package com.example.portfolio.mapper;

import com.example.portfolio.domain.Blog;
import com.example.portfolio.dto.BlogDto;
import com.example.portfolio.service.impl.AbstractCrudService.CrudMapper;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BlogMapper extends CrudMapper<BlogDto, Blog> {

    @Override
    BlogDto toDto(Blog e);

    @Override
    Blog toEntity(BlogDto dto);
}