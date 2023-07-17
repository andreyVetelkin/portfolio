package com.example.HC.model;
import com.example.HC.repository.EstimateWorkRepository;
import com.example.HC.repository.WorkRepository;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Entity
@Table(name = "estimate")
public class Estimate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "employee_id", nullable = false)
    private int employeeId;

    @Column(name = "user_id", nullable = false)
    private int userId;

    @Column(name = "confirmed")
    private String confirmed;

    @Column(name = "closed")
    private String closed;






}