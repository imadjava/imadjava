package com.example.portfolio.service.impl;

import com.example.portfolio.domain.Skill;
import com.example.portfolio.dto.SkillDto;
import com.example.portfolio.mapper.SkillMapper;
import com.example.portfolio.repository.SkillRepository;
import com.example.portfolio.service.SkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class SkillServiceImpl extends AbstractCrudService<SkillDto, Skill, SkillRepository> implements SkillService {
    public SkillServiceImpl(SkillRepository repository, SkillMapper mapper) {
        super(repository, mapper);
    }

    @Override
    public List<SkillDto> listByCategory(String category) {
        return repository.findByCategory(category).stream().map(mapper::toDto).collect(Collectors.toList());
    }
}

