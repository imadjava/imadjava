package com.example.portfolio.service.impl;

import com.example.portfolio.dto.ExperienceDto;
import com.example.portfolio.mapper.ExperienceMapper;
import com.example.portfolio.repository.ExperienceRepository;
import com.example.portfolio.service.ExperienceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ExperienceServiceImpl implements ExperienceService {
    private final ExperienceRepository repository;
    private final ExperienceMapper mapper;

    @Override
    public ExperienceDto create(ExperienceDto dto) {
        var entity = mapper.toEntity(dto);
        var saved = repository.save(entity);
        return mapper.toDto(saved);
    }

    @Override
    public ExperienceDto update(Long id, ExperienceDto dto) {
        var existing = repository.findById(id).orElseThrow(() -> new RuntimeException("Experience not found"));
        var toSave = mapper.toEntity(dto);
        toSave.setId(existing.getId());
        var saved = repository.save(toSave);
        return mapper.toDto(saved);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public ExperienceDto getById(Long id) {
        return repository.findById(id).map(mapper::toDto).orElseThrow(() -> new RuntimeException("Not found"));
    }

    @Override
    public List<ExperienceDto> listAll() {
        return repository.findAll().stream().map(mapper::toDto).collect(Collectors.toList());
    }
}

