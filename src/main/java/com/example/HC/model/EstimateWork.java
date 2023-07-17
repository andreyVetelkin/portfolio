package com.example.HC.model;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "estimate_work")
@Builder
public class EstimateWork {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "estimate_id", nullable = false)
    private int estimateId;


    @Column(name = "work_id", nullable = false)
    private int workId;

    EstimateWork (){

    }

    public EstimateWork(int id, int estimateId, int workId) {
        this.id = id;
        this.estimateId = estimateId;
        this.workId = workId;
    }
}
