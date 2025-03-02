package com.register.model;
import lombok.*;

@ToString
@Setter
@Getter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Payment {
    private String razorpay_order_id;
    private String razorpay_payment_id;
    private String razorpay_signature;

    // Getters and Setters
}