package com.example.HC.repository;

import com.example.HC.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {

    User findByPhoneAndPassword(String phone, String password);
}
