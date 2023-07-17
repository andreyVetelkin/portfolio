package com.example.HC.repository;

import com.example.HC.model.Estimate;
import com.example.HC.model.EstimateWork;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
public interface EstimateWorkRepository extends JpaRepository<EstimateWork, Integer> {
    List<EstimateWork> findAllByEstimateId(Integer estimateId);
    EstimateWork findByWorkId(Integer workId);
}
