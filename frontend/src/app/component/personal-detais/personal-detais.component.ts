import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper'; // For stepper
import { MatFormFieldModule } from '@angular/material/form-field'; // For form fields
import { MatInputModule } from '@angular/material/input'; // For input fields
@Component({
  selector: 'app-personal-detais',
  imports: [MatInputModule,ReactiveFormsModule,MatFormFieldModule,CommonModule],
  templateUrl: './personal-detais.component.html',
  styleUrl: './personal-detais.component.css'
})
export class PersonalDetaisComponent implements OnInit {

  public form!: FormGroup;


  constructor(private fb : FormBuilder){}

  ngOnInit(): void {
    this.form = this.fb.group({
      name : ['', Validators.required],
      email : ['', Validators.required],
      phoneNumber : ['', Validators.required],
    });
  }
}
