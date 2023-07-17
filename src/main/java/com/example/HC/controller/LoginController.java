package com.example.HC.controller;

import com.example.HC.model.User;
import com.example.HC.model.Work;
import com.example.HC.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("login")
public class LoginController {

    private final UserRepository userRepository;

    @Autowired
    public LoginController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/auth")
    public ResponseEntity<User> authUser(@RequestBody @Validated User user) {
        User currentUser = userRepository.findByPhoneAndPassword(user.getPhone(), user.getPassword());
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(currentUser);
    }

    @PostMapping("/reg")
    public ResponseEntity<User> registerUser(@RequestBody @Validated User user) {
        User existingUser = userRepository.findById(user.getId()).orElse(null);
        if (existingUser != null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(userRepository.save(user));
    }
}
