package com.example.portfolio.service.impl;

import com.example.portfolio.service.GenericCrudService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Transactional
public abstract class AbstractCrudService<T, E, R extends JpaRepository<E, Long>> implements GenericCrudService<T> {
    protected final R repository;
    protected final CrudMapper<T, E> mapper;

    public AbstractCrudService(R repository, CrudMapper<T, E> mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public T create(T dto) {
        E entity = mapper.toEntity(dto);
        E saved = repository.save(entity);
        return mapper.toDto(saved);
    }

    @Override
    public T update(Long id, T dto) {
        E existing = repository.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
        E toSave = mapper.toEntity(dto);
        toSave = enrichEntity(toSave, existing);
        E saved = repository.save(toSave);
        return mapper.toDto(saved);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public T getById(Long id) {
        return repository.findById(id).map(mapper::toDto).orElseThrow(() -> new RuntimeException("Not found"));
    }

    @Override
    public List<T> listAll() {
        return repository.findAll().stream().map(mapper::toDto).collect(Collectors.toList());
    }

    protected E enrichEntity(E newEntity, E existing) {
        return newEntity;
    }

    public interface CrudMapper<T, E> {
        T toDto(E e);
        E toEntity(T dto);
    }
}

