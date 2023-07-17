package com.example.HC.controller;

import com.example.HC.model.Application;
import com.example.HC.model.Estimate;
import com.example.HC.model.User;
import com.example.HC.repository.ApplicationRepository;
import com.example.HC.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/app")
public class ApplicationController {

    private final ApplicationRepository applicationRepository;
    private final RestTemplate restTemplate;

    @Autowired
    public ApplicationController(ApplicationRepository applicationRepository, RestTemplate restTemplate) {
        this.applicationRepository = applicationRepository;
        this.restTemplate = restTemplate;
    }

    @GetMapping("/{applicationId}/{employeeId}")
    public Application updateEmployeeInApp(@PathVariable("applicationId") Integer applicationId,
                                           @PathVariable("employeeId") Integer employeeId) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Application not found"));

        application.setEmployeeId(employeeId);
        return applicationRepository.save(application);
    }

    @GetMapping("/getApplications")
    public List<Application> getApplications(
            @RequestParam(required = false) Integer employeeId,
            @RequestParam(required = false) Integer userId
    ) {
        List<Application> applications;

        if (employeeId != null) {
            applications = applicationRepository.findAllByEmployeeIdAndClosedIsNull(employeeId);
        } else if (userId != null) {
            applications = applicationRepository.findAllByUserIdAndClosedIsNull(userId);
        } else {
            applications = applicationRepository.findAllByClosedIsNull();
        }

        if (applications.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Applications not found");
        }

        applications.forEach(application -> application.fillUserInformation(restTemplate));

        return applications;
    }

    @GetMapping("/admin/getAppForUserId/{userId}")
    public Application findAppByUserId(@PathVariable Integer userId) {
        Application application = applicationRepository.findByUserIdAndClosedIsNull(userId);

        if (application == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Application not found");
        }

        return application;
    }

    @PostMapping("/newApp")
    public Application addApplication(@RequestBody @Validated Application application) {
        Integer userId = application.getUserId();
        Application existingApplication = applicationRepository.findByUserIdAndClosedIsNull(userId);
        if (existingApplication != null) {

            throw new ResponseStatusException(HttpStatus.CONFLICT, "Application already created");

        }

        return applicationRepository.save(application);
    }

    @PostMapping("/close")
    public Application close(@RequestBody @Validated Application application) {
        return applicationRepository.save(application.close(restTemplate));
    }
}
