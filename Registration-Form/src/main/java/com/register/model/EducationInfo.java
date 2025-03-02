package com.register.model;

import lombok.*;

@ToString
@Setter
@Getter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EducationInfo {
    private String college;
    private String year;
    private String cgpa;

    // Getters and Setters
}
