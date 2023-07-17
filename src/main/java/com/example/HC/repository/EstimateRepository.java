package com.example.HC.repository;

import com.example.HC.model.Estimate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EstimateRepository extends JpaRepository<Estimate, Integer> {

    Estimate findByEmployeeIdAndClosedIsNull(Integer id);
    Estimate findByUserIdAndClosedIsNull(Integer id);
}
