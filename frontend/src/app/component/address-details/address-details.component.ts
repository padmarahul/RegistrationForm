import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper'; // For stepper
import { MatFormFieldModule } from '@angular/material/form-field'; // For form fields
import { MatInputModule } from '@angular/material/input'; // For input fields
@Component({
  selector: 'app-address-details',
    imports: [MatInputModule,ReactiveFormsModule,MatFormFieldModule,CommonModule],
  templateUrl: './address-details.component.html',
  styleUrl: './address-details.component.css'
})
export class AddressDetailsComponent implements OnInit {

  public form!: FormGroup;


  constructor(private fb : FormBuilder){}

  ngOnInit(): void {
    this.form = this.fb.group({
      address : ['', Validators.required],
      city : ['', Validators.required],
      state : ['', Validators.required],
      country : ['', Validators.required],
      zipcode : ['', Validators.required],
      
    });
  }
}

