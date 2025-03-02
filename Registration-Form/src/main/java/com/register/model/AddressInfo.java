package com.register.model;

import lombok.*;

@ToString
@Setter
@Getter
@Data
@AllArgsConstructor
@NoArgsConstructor

public class AddressInfo {
    private String address;
    private String city;
    private String state;
    private String country;
    private String zipcode;

    // Getters and Setters
}