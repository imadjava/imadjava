package com.example.portfolio.service;

import com.example.portfolio.domain.Experience;
import com.example.portfolio.dto.ExperienceDto;
import com.example.portfolio.mapper.ExperienceMapper;
import com.example.portfolio.repository.ExperienceRepository;
import com.example.portfolio.service.impl.ExperienceServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ExperienceServiceTest {
    @Mock
    private ExperienceRepository repository;
    @Mock
    private ExperienceMapper mapper;
    private ExperienceServiceImpl service;

    @BeforeEach
    void setUp() {
        service = new ExperienceServiceImpl(repository, mapper);
    }

    @Test
    void testCreate() {
        ExperienceDto dto = ExperienceDto.builder()
                .companyName("Test Corp")
                .designation("Developer")
                .startDate(LocalDate.now())
                .build();

        Experience entity = Experience.builder().id(1L).companyName("Test Corp").build();
        
        when(mapper.toEntity(dto)).thenReturn(entity);
        when(repository.save(entity)).thenReturn(entity);
        when(mapper.toDto(entity)).thenReturn(dto);

        ExperienceDto result = service.create(dto);

        assertNotNull(result);
        assertEquals("Test Corp", result.getCompanyName());
        verify(repository, times(1)).save(entity);
    }

    @Test
    void testListAll() {
        Experience exp = Experience.builder().id(1L).companyName("Test").build();
        ExperienceDto dto = ExperienceDto.builder().id(1L).companyName("Test").build();

        when(repository.findAll()).thenReturn(List.of(exp));
        when(mapper.toDto(exp)).thenReturn(dto);

        List<ExperienceDto> result = service.listAll();

        assertEquals(1, result.size());
        verify(repository, times(1)).findAll();
    }

    @Test
    void testGetById() {
        Long id = 1L;
        Experience exp = Experience.builder().id(id).companyName("Test").build();
        ExperienceDto dto = ExperienceDto.builder().id(id).companyName("Test").build();

        when(repository.findById(id)).thenReturn(Optional.of(exp));
        when(mapper.toDto(exp)).thenReturn(dto);

        ExperienceDto result = service.getById(id);

        assertNotNull(result);
        verify(repository, times(1)).findById(id);
    }
}

