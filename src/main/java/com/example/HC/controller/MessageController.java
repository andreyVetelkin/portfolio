package com.example.HC.controller;

import com.example.HC.model.Message;
import com.example.HC.model.User;
import com.example.HC.model.MessageInfo;
import com.example.HC.repository.MessageRepository;
import com.example.HC.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/mess")
public class MessageController {

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;

    @Autowired
    public MessageController(MessageRepository messageRepository, UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }



    @GetMapping("/{chatId}")
    public ResponseEntity<List<MessageInfo>> getMessage(@PathVariable Integer chatId) {
        List<Message> messages = messageRepository.findAllByChatId(chatId);

        return ResponseEntity.ok(
                messages.stream()
                .map(message -> MessageInfo.builder()
                        .id(message.getId())
                        .sender(message.getSender())
                        .recipient(message.getRecipient())
                        .message(message.getMessage())
                        .messageSenderName(userRepository.findById(message.getSender()).get().getFirstName())// МЕНЯЛ
                        .chatId(message.getChatId())
                        .build())
                .collect(Collectors.toList())
        );
    }

    @PostMapping("/")
    public ResponseEntity<Message> addMessage(@RequestBody Message message) {
        return ResponseEntity.ok(messageRepository.save(message));
    }
}
