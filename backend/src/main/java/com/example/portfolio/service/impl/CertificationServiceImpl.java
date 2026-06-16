package com.example.portfolio.service.impl;

import com.example.portfolio.domain.Certification;
import com.example.portfolio.dto.CertificationDto;
import com.example.portfolio.mapper.CertificationMapper;
import com.example.portfolio.repository.CertificationRepository;
import com.example.portfolio.service.CertificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CertificationServiceImpl extends AbstractCrudService<CertificationDto, Certification, CertificationRepository> implements CertificationService {
    public CertificationServiceImpl(CertificationRepository repository, CertificationMapper mapper) {
        super(repository, mapper);
    }
}

