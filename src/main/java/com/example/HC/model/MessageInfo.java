package com.example.HC.model;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MessageInfo {
    private int id;
    private Integer sender;
    private Integer recipient;
    private String message;
    private String messageSenderName;
    private int chatId;
}
