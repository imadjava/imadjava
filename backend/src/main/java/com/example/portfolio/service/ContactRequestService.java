package com.example.portfolio.service;

import com.example.portfolio.dto.ContactRequestDto;

import java.util.List;

public interface ContactRequestService extends GenericCrudService<ContactRequestDto> {
    List<ContactRequestDto> listUnprocessed();
    void markAsProcessed(Long id);
}

