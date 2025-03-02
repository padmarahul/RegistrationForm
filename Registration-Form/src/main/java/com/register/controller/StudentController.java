package com.register.controller;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.register.model.StudentData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Autowired
    private ObjectMapper objectMapper; // Jackson ObjectMapper for JSON serialization

    @PostMapping
    public ResponseEntity<Map<String, String>> saveStudentData(@RequestBody StudentData studentData) throws JsonProcessingException {
        String studentId = studentData.getStudentid();

        // Serialize and store each field in Redis
        redisTemplate.opsForHash().put(studentId, "personalInfo", objectMapper.writeValueAsString(studentData.getPersonalInfo()));
        redisTemplate.opsForHash().put(studentId, "addressInfo", objectMapper.writeValueAsString(studentData.getAddressInfo()));
        redisTemplate.opsForHash().put(studentId, "educationInfo", objectMapper.writeValueAsString(studentData.getEducationInfo()));
        redisTemplate.opsForHash().put(studentId, "payment", objectMapper.writeValueAsString(studentData.getPayment()));
        redisTemplate.opsForHash().put(studentId, "selectedCourses", objectMapper.writeValueAsString(studentData.getSelectedCourses()));
        Map<String, String> response = new HashMap<>();
        response.put("message", "Student data saved with ID: " + studentId);
        response.put("studentId", studentId); // Include studentId in the response
        return ResponseEntity.ok(response);
    }
}