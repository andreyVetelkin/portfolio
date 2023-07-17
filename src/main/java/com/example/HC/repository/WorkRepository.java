package com.example.HC.repository;

import com.example.HC.model.Work;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface WorkRepository extends JpaRepository<Work, Integer> {
}
