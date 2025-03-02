package com.register.model;

import lombok.*;

@ToString
@Setter
@Getter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PersonalInfo {
    private String name;
    private String email;
    private String phoneNumber;

    // Getters and Setters
}