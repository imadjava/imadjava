package com.example.portfolio.service;

import java.util.List;

public interface GenericCrudService<T> {
    T create(T dto);
    T update(Long id, T dto);
    void delete(Long id);
    T getById(Long id);
    List<T> listAll();
}

