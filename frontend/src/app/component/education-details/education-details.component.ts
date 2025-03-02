import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper'; // For stepper
import { MatFormFieldModule } from '@angular/material/form-field'; // For form fields
import { MatInputModule } from '@angular/material/input'; // For input fields
@Component({
  selector: 'app-education-details',
 imports: [MatInputModule,ReactiveFormsModule,MatFormFieldModule,CommonModule],
  templateUrl: './education-details.component.html',
  styleUrl: './education-details.component.css'
})
export class EducationDetailsComponent implements OnInit {

  public form!: FormGroup;


  constructor(private fb : FormBuilder){}

  ngOnInit(): void {
    this.form = this.fb.group({
      college : ['', Validators.required],
      year : ['', Validators.required],
      cgpa : ['', Validators.required],
    });
  }
}


