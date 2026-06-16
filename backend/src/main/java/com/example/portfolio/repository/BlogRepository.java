package com.example.portfolio.repository;

import com.example.portfolio.domain.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {
    List<Blog> findByCategory(String category);
    List<Blog> findByTitleContaining(String title);
}

