package com.example.HC.controller;

import com.example.HC.model.User;
import com.example.HC.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable int id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    class UserNotFoundException extends RuntimeException {
        public UserNotFoundException(int id) {
            super("User not found with id " + id);
        }
    }
}
