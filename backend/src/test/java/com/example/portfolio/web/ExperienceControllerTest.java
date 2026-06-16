package com.example.portfolio.web;

import com.example.portfolio.dto.ExperienceDto;
import com.example.portfolio.security.JwtFilter;
import com.example.portfolio.security.JwtUtil;
import com.example.portfolio.service.ExperienceService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ExperienceController.class)
@AutoConfigureMockMvc(addFilters = false)
class ExperienceControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private ExperienceService service;

    @MockBean
    private JwtFilter jwtFilter;

    @MockBean
    private JwtUtil jwtUtil;

    @Test
    void testListExperiences() throws Exception {
        ExperienceDto dto = ExperienceDto.builder()
                .id(1L)
                .companyName("Test Corp")
                .designation("Developer")
                .build();

        when(service.listAll()).thenReturn(List.of(dto));

        mvc.perform(get("/api/v1/experiences"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].companyName").value("Test Corp"));

        verify(service, times(1)).listAll();
    }

    @Test
    void testGetSingleExperience() throws Exception {
        ExperienceDto dto = ExperienceDto.builder()
                .id(1L)
                .companyName("Test Corp")
                .designation("Developer")
                .build();

        when(service.getById(1L)).thenReturn(dto);

        mvc.perform(get("/api/v1/experiences/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.companyName").value("Test Corp"));

        verify(service, times(1)).getById(1L);
    }

    public JwtUtil getJwtUtil() {
        return jwtUtil;
    }

    public void setJwtUtil(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    public JwtFilter getJwtFilter() {
        return jwtFilter;
    }

    public void setJwtFilter(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }
}

