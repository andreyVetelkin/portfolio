package com.example.HC.repository;

import com.example.HC.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Integer> {


    List<Application> findAllByClosedIsNull();

    Application findByEmployeeIdAndClosedIsNull(Integer id);
    Application findByUserIdAndClosedIsNull(Integer id);
    List<Application> findAllByUserIdAndClosedIsNull(Integer id);
    List<Application> findAllByEmployeeIdAndClosedIsNull(Integer id);
}
