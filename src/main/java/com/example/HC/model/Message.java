package com.example.HC.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

@Entity
@Table(name = "message")
@Data
@ToString
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "sender", nullable = false)
    private Integer sender;

    @Column(name = "recipient", nullable = false)
    private Integer recipient;


    @Column(name = "message", nullable = false)
    private String message;

    @Column(name = "chat_id", nullable = false)
    private int chatId;
}
