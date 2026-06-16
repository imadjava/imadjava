package com.example.portfolio.service.impl;

import com.example.portfolio.domain.ContactRequest;
import com.example.portfolio.dto.ContactRequestDto;
import com.example.portfolio.mapper.ContactRequestMapper;
import com.example.portfolio.repository.ContactRequestRepository;
import com.example.portfolio.service.ContactRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ContactRequestServiceImpl extends AbstractCrudService<ContactRequestDto, ContactRequest, ContactRequestRepository> implements ContactRequestService {
    public ContactRequestServiceImpl(ContactRequestRepository repository, ContactRequestMapper mapper) {
        super(repository, mapper);
    }

    @Override
    public List<ContactRequestDto> listUnprocessed() {
        return repository.findByProcessedFalse().stream().map(mapper::toDto).collect(Collectors.toList());
    }

    @Override
    public void markAsProcessed(Long id) {
        var req = repository.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
        req.setProcessed(true);
        repository.save(req);
    }
}

