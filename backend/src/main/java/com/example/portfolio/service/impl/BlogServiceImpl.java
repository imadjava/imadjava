package com.example.portfolio.service.impl;

import com.example.portfolio.domain.Blog;
import com.example.portfolio.dto.BlogDto;
import com.example.portfolio.mapper.BlogMapper;
import com.example.portfolio.repository.BlogRepository;
import com.example.portfolio.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class BlogServiceImpl extends AbstractCrudService<BlogDto, Blog, BlogRepository> implements BlogService {
    public BlogServiceImpl(BlogRepository repository, BlogMapper mapper) {
        super(repository, mapper);
    }

    @Override
    public List<BlogDto> searchByTitle(String title) {
        return repository.findByTitleContaining(title).stream().map(mapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<BlogDto> listByCategory(String category) {
        return repository.findByCategory(category).stream().map(mapper::toDto).collect(Collectors.toList());
    }
}

