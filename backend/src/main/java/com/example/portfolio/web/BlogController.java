package com.example.portfolio.web;

import com.example.portfolio.dto.BlogDto;
import com.example.portfolio.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/blogs")

public class BlogController extends GenericCrudController<BlogDto> {
    private final BlogService blogService;

    public BlogController(BlogService service) {
        super(service);
        this.blogService = service;
    }

    @GetMapping("/search")
    public ResponseEntity<List<BlogDto>> search(@RequestParam String title) {
        return ResponseEntity.ok(blogService.searchByTitle(title));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<BlogDto>> getByCategory(@PathVariable String category) {
        return ResponseEntity.ok(blogService.listByCategory(category));
    }
}

