package com.example.portfolio.web;

import com.example.portfolio.dto.ContactRequestDto;
import com.example.portfolio.service.ContactRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/contact-requests")

public class ContactRequestController extends GenericCrudController<ContactRequestDto> {
    private final ContactRequestService contactRequestService;

    public ContactRequestController(ContactRequestService service) {
        super(service);
        this.contactRequestService = service;
    }

    @PostMapping("/submit")
    public ResponseEntity<ContactRequestDto> submit(@RequestBody ContactRequestDto dto) {
        dto.setCreatedAt(LocalDateTime.now());
        dto.setProcessed(false);
        return ResponseEntity.ok(contactRequestService.create(dto));
    }

    @GetMapping("/unprocessed")
    public ResponseEntity<List<ContactRequestDto>> listUnprocessed() {
        return ResponseEntity.ok(contactRequestService.listUnprocessed());
    }

    @PostMapping("/{id}/mark-processed")
    public ResponseEntity<Void> markProcessed(@PathVariable Long id) {
        contactRequestService.markAsProcessed(id);
        return ResponseEntity.noContent().build();
    }
}

