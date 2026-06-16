package com.example.portfolio.mapper;

import com.example.portfolio.domain.ContactRequest;
import com.example.portfolio.dto.ContactRequestDto;
import com.example.portfolio.service.impl.AbstractCrudService;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ContactRequestMapper extends AbstractCrudService.CrudMapper<ContactRequestDto, ContactRequest> {
    ContactRequestDto toDto(ContactRequest e);
    ContactRequest toEntity(ContactRequestDto dto);
}

