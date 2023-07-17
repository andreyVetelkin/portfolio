package com.example.HC.repository;

import com.example.HC.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message,Integer> {
    List<Message> findAllBySenderAndRecipient(Integer sender, Integer recipient);
    List<Message> findAllByRecipient(Integer recipient);


    @Query("SELECT m FROM Message m WHERE m.chatId = :id")
    List<Message> findAllByChatId(@Param("id") Integer id);
}
