package com.example.HC.repository;

import com.example.HC.model.Work;
import com.example.HC.model.WorkHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface WorkHistoryRepository extends JpaRepository<WorkHistory, Integer> {
    List<WorkHistory> findByUserId(int userId);
    List<WorkHistory> findByEmployeeId(int employeeId);
}
