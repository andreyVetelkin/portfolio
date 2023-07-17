package com.example.HC.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "works")
@Data
public class Work {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

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


}