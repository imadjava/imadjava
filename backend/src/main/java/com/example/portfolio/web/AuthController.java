package com.example.portfolio.web;

import com.example.portfolio.domain.User;
import com.example.portfolio.repository.UserRepository;
import com.example.portfolio.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/auth")

public class AuthController {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository, JwtUtil jwtUtil, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        var username = body.get("username");
        var password = body.get("password");
        if (userRepository.findByUsername(username).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "User exists"));
        }
        var user = User.builder()
                .username(username)
                .password(passwordEncoder.encode(password))
                .roles(Set.of("ADMIN"))
                .build();
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("status", "created"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        var username = body.get("username");
        var password = body.get("password");
        var userOpt = userRepository.findByUsername(username);
        if (userOpt.isEmpty()) return ResponseEntity.status(401).build();
        var user = userOpt.get();
        if (!passwordEncoder.matches(password, user.getPassword())) return ResponseEntity.status(401).build();
        var token = jwtUtil.generateToken(user.getUsername(), user.getRoles());
        return ResponseEntity.ok(Map.of("token", token));
    }
}

