package com.example.HC.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "works_history")
@Data
public class WorkHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "user_id", nullable = false)
    private int userId;

    @Column(name = "employee_id", nullable = false)
    private int employeeId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "unit", nullable = false)
    private String unit;

    @Column(name = "quantity")
    private double quantity;

    @Column(name = "price")
    private double price;

    @Column(name = "total_cost")
    private double totalCost;

    @Column(name = "action", nullable = false)
    private String action;

    @Column(name = "created_at", nullable = false)
    private Date createdAt;


}