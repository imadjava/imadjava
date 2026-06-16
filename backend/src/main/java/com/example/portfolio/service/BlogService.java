package com.example.portfolio.service;

import com.example.portfolio.dto.BlogDto;

import java.util.List;

public interface BlogService extends GenericCrudService<BlogDto> {
    List<BlogDto> searchByTitle(String title);
    List<BlogDto> listByCategory(String category);
}

