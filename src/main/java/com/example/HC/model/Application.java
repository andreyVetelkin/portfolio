package com.example.HC.model;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.RestTemplate;

import java.util.Date;

@Entity
@Table(name = "Application")
@Data
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "employee_id")
    private Integer employeeId;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "address")
    private String address;

    @Column(name = "comment")
    private String comment;

    @Column(name = "closed")
    private String closed;

    @Column(name = "completed_date")
    private Date completedDate;

    private String userFirstName;
    private String userLastName;
    private String userPhone;

    public void fillUserInformation(RestTemplate restTemplate){
        ResponseEntity<User> response = restTemplate.getForEntity("http://localhost:8080/user/{id}", User.class, this.userId);
        User user = response.getBody();
        if (user!=null) {
            this.setUserFirstName(user.getFirstName());
            this.setUserLastName(user.getLastName());
            this.setUserPhone(user.getPhone());

        }
    }


    public Application close(RestTemplate restTemplate) {
        this.setCompletedDate(new Date());
        this.setClosed("closed");
        ResponseEntity<Estimate> response = restTemplate.getForEntity("http://localhost:8080/estimate/byUserId/{id}", Estimate.class, this.getUserId());
        Estimate updatedEstimate = response.getBody();
        updatedEstimate.setClosed("closed");
        restTemplate.put("http://localhost:8080/estimate/update/estimate", updatedEstimate, Estimate.class);

        return this;
    }
}