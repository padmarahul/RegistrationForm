package com.register.model;

import java.util.List;
import lombok.*;
import lombok.*;

@ToString
@Setter
@Getter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentData {
    private String Studentid;
    private PersonalInfo personalInfo;
    private AddressInfo addressInfo;
    private EducationInfo educationInfo;
    private Payment payment;
    private List<Course> selectedCourses;

    // Getters and Setters
}