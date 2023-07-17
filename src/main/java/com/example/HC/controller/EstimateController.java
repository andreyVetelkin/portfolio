package com.example.HC.controller;

import com.example.HC.model.Estimate;
import com.example.HC.model.EstimateWork;
import com.example.HC.model.Work;
import com.example.HC.model.WorkHistory;
import com.example.HC.repository.EstimateRepository;
import com.example.HC.repository.EstimateWorkRepository;
import com.example.HC.repository.WorkHistoryRepository;
import com.example.HC.repository.WorkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/estimate")
public class EstimateController {
    private final EstimateRepository estimateRepository;
    private final EstimateWorkRepository estimateWorkRepository;
    private final WorkRepository workRepository;

    private final WorkHistoryRepository workHistoryRepository;

    @Autowired
    public EstimateController(EstimateRepository estimateRepository, EstimateWorkRepository estimateWorkRepository, WorkRepository workRepository, WorkHistoryRepository workHistoryRepository) {
        this.estimateRepository = estimateRepository;
        this.estimateWorkRepository = estimateWorkRepository;
        this.workRepository = workRepository;
        this.workHistoryRepository = workHistoryRepository;
    }

    private List<Work> getWorks(int estimateId) {
        List<EstimateWork> estimateWorks = estimateWorkRepository.findAllByEstimateId(estimateId);
        return estimateWorks.stream()
                .map(estimateWork -> workRepository.findById(estimateWork.getWorkId()).orElse(null))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    private ResponseEntity<Estimate> getEstimateResponse(int id) {
        Estimate estimate = estimateRepository.findById(id).orElse(null);
        if (estimate == null || Objects.equals(estimate.getClosed(), "closed")) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(estimate);
    }

    private ResponseEntity<List<Work>> getEstimateWorksResponse(int id) {
        Estimate estimate = estimateRepository.findById(id).orElse(null);
        if (estimate == null || Objects.equals(estimate.getClosed(), "closed")) {
            return ResponseEntity.notFound().build();
        }
        List<Work> works = this.getWorks(id);
        return ResponseEntity.ok(works);
    }

    @GetMapping("/byUserId/{id}")
    public ResponseEntity<Estimate> getEstimateByUserId(@PathVariable int id) {
        Estimate estimate = estimateRepository.findByUserIdAndClosedIsNull(id);
        return ResponseEntity.ok(estimate);
    }

    @GetMapping("/byEmployeeId/{id}")
    public ResponseEntity<Estimate> getEstimateByEmployeeId(@PathVariable int id) {
        Estimate estimate = estimateRepository.findByEmployeeIdAndClosedIsNull(id);
        return ResponseEntity.ok(estimate);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Estimate> getEstimate(@PathVariable int id) {
        return getEstimateResponse(id);
    }

    @GetMapping("/{id}/works")
    public ResponseEntity<List<Work>> getEstimateWorks(@PathVariable int id) {
        return getEstimateWorksResponse(id);
    }

    @PostMapping("/{id}/works")
    public ResponseEntity<Work> addWorkToEstimate(@PathVariable int id, @RequestBody Work work) {
        Estimate estimate = estimateRepository.findById(id).orElse(null);
        if (estimate == null) {
            return ResponseEntity.notFound().build();
        }
        estimate.setConfirmed("N");
        //Сохранение истории
        WorkHistory workHistory = new WorkHistory();
        workHistory.setUserId(estimate.getUserId());
        workHistory.setEmployeeId(estimate.getEmployeeId());
        workHistory.setName(work.getName());
        workHistory.setUnit(work.getUnit());
        workHistory.setQuantity(work.getQuantity());
        workHistory.setPrice(work.getPrice());
        workHistory.setTotalCost(work.getQuantity() * work.getPrice());
        workHistory.setAction("insert");
        workHistory.setCreatedAt(new Date());
        workHistoryRepository.save(workHistory);

        estimateRepository.save(estimate);
        Work savedWork = workRepository.save(work);
        estimateWorkRepository.save(EstimateWork.builder()
                .estimateId(estimate.getId())
                .workId(savedWork.getId())
                .build());
        return ResponseEntity.status(HttpStatus.CREATED).body(savedWork);
    }

    @PostMapping("/add")
    public ResponseEntity<Estimate> addEstimate(@RequestBody Estimate estimate) {
        Estimate savedEstimate = estimateRepository.save(estimate);
        if (estimateRepository.findByUserIdAndClosedIsNull(estimate.getUserId()) != null){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Estimate already created");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEstimate);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Work> updateWork(@PathVariable Integer id, @RequestBody Work work) {
        Estimate estimate = estimateRepository.findById(id).orElse(null);
        if (estimate == null) {
            return ResponseEntity.notFound().build();
        }
        Work existingWork = workRepository.findById(work.getId()).orElse(null);
        if (existingWork == null) {
            return ResponseEntity.notFound().build();
        }
        estimate.setConfirmed("N");
        //Сохранение истории
        WorkHistory workHistory = new WorkHistory();
        workHistory.setUserId(estimate.getUserId());
        workHistory.setEmployeeId(estimate.getEmployeeId());
        workHistory.setName(work.getName());
        workHistory.setUnit(work.getUnit());
        workHistory.setQuantity(work.getQuantity());
        workHistory.setPrice(work.getPrice());
        workHistory.setTotalCost(work.getQuantity() * work.getPrice());
        workHistory.setAction("update");
        workHistory.setCreatedAt(new Date());
        workHistoryRepository.save(workHistory);

        estimateRepository.save(estimate);
        Work updatedWork = workRepository.save(work);
        return ResponseEntity.ok(updatedWork);
    }

    @PutMapping("/update/estimate")
    public ResponseEntity<Estimate> updateEstimate(@RequestBody Estimate estimate) {
        Estimate existingEstimate = estimateRepository.findById(estimate.getId()).orElse(null);
        if (existingEstimate == null) {
            return ResponseEntity.notFound().build();
        }
        Estimate updatedEstimate = estimateRepository.save(estimate);
        return ResponseEntity.ok(updatedEstimate);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteWork(@PathVariable int id) {
        EstimateWork estimateWork = estimateWorkRepository.findByWorkId(id);
        Work work = workRepository.findById(id).orElse(null);
        if (estimateWork == null) {
            return ResponseEntity.notFound().build();
        }
        Estimate estimate = estimateRepository.findById(estimateWork.getEstimateId()).orElse(null);
        if (estimate == null) {
            return ResponseEntity.notFound().build();
        }

        if (work == null) {
            return ResponseEntity.notFound().build();
        }
        //Сохранение истории
        WorkHistory workHistory = new WorkHistory();
        workHistory.setUserId(estimate.getUserId());
        workHistory.setEmployeeId(estimate.getEmployeeId());
        workHistory.setName(work.getName());
        workHistory.setUnit(work.getUnit());
        workHistory.setQuantity(work.getQuantity());
        workHistory.setPrice(work.getPrice());
        workHistory.setTotalCost(work.getQuantity() * work.getPrice());
        workHistory.setAction("delete");
        workHistory.setCreatedAt(new Date());
        workHistoryRepository.save(workHistory);

        estimate.setConfirmed("N");
        estimateRepository.save(estimate);
        estimateWorkRepository.delete(estimateWork);
        workRepository.delete(work);
        return ResponseEntity.noContent().build();
    }
}



