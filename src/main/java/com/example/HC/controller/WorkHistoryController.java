package com.example.HC.controller;



import com.example.HC.model.WorkHistory;
import com.example.HC.repository.WorkHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/work-history")
public class WorkHistoryController {

    private final WorkHistoryRepository workHistoryRepository;

    @Autowired
    public WorkHistoryController(WorkHistoryRepository workHistoryRepository) {
        this.workHistoryRepository = workHistoryRepository;
    }

    @GetMapping("/")
    public ResponseEntity<List<WorkHistory>> getAllWorkHistory() {
        List<WorkHistory> workHistoryList = workHistoryRepository.findAll();
        return ResponseEntity.ok(workHistoryList);
    }

    @GetMapping("/byUserId/{userId}")
    public ResponseEntity<List<WorkHistory>> getWorkHistoryByUserId(@PathVariable int userId) {
        List<WorkHistory> workHistoryList = workHistoryRepository.findByUserId(userId);
        return ResponseEntity.ok(workHistoryList);
    }

    @GetMapping("/byEmployeeId/{employeeId}")
    public ResponseEntity<List<WorkHistory>> getWorkHistoryByEmployeeId(@PathVariable int employeeId) {
        List<WorkHistory> workHistoryList = workHistoryRepository.findByEmployeeId(employeeId);
        return ResponseEntity.ok(workHistoryList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkHistory> getWorkHistoryById(@PathVariable int id) {
        WorkHistory workHistory = workHistoryRepository.findById(id).orElse(null);
        if (workHistory == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(workHistory);
    }


}

