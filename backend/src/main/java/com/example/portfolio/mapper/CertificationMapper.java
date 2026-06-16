package com.example.portfolio.mapper;

import com.example.portfolio.domain.Certification;
import com.example.portfolio.dto.CertificationDto;
import com.example.portfolio.service.impl.AbstractCrudService.CrudMapper;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CertificationMapper extends CrudMapper<CertificationDto, Certification> {

    @Override
    CertificationDto toDto(Certification e);

    @Override
    Certification toEntity(CertificationDto dto);
}