package com.register.model;
import lombok.*;

@ToString
@Setter
@Getter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Course {
    private String courseName;
    private double amount;
    private int courseId;

    // Getters and Setters
}