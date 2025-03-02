import { CdkStepperModule } from '@angular/cdk/stepper';
import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddressDetailsComponent } from '../component/address-details/address-details.component';
import { CourseDetailsComponent } from '../component/course-details/course-details.component';
import { EducationDetailsComponent } from '../component/education-details/education-details.component';
import { PaymentComponent } from '../component/payment/payment.component';
import { PersonalDetaisComponent } from '../component/personal-detais/personal-detais.component';
import { PersonalInfo, AddressInfo, EducationInfo, Course ,Payment ,StudentData} from '../modelData/model'; // ✅ Import interfaces
import { Router } from '@angular/router';
import { DataServiceService } from '../service/data-service.service';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [
    MatStepperModule,
    CommonModule,
    CdkStepperModule,
    AddressDetailsComponent,
    CourseDetailsComponent,
    EducationDetailsComponent,
    PaymentComponent,
    PersonalDetaisComponent,
    ReactiveFormsModule
  ],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements AfterViewInit {
  @ViewChild(PersonalDetaisComponent) personal!: PersonalDetaisComponent;
  @ViewChild(AddressDetailsComponent) address!: AddressDetailsComponent;
  @ViewChild(EducationDetailsComponent) education!: EducationDetailsComponent;
  @ViewChild(CourseDetailsComponent) courseComponent!: CourseDetailsComponent;
  @ViewChild(PaymentComponent) payment! : PaymentComponent
  @ViewChild('stepper') stepper!: MatStepper;
  paymentres!: Payment;
  personalForm!: FormGroup;
  addressForm!: FormGroup;
  educationForm!: FormGroup;
  courseForm!: FormGroup;
  personalInfo!: PersonalInfo;
  addressInfo!: AddressInfo;
  educationInfo!: EducationInfo;
  listofcourses: Course[] = [];
  studentId : String = this.generateStudentId();
  studentData! : StudentData;
 
  

  constructor(private cdr: ChangeDetectorRef,private router: Router,private dataServiceService : DataServiceService) {
    this.studentData = {
      studentid: '', // Initialize with default values
      personalInfo: { name: '', email: '', phoneNumber: '' },
      addressInfo: { address: '', city: '', state: '', country: '', zipcode: '' },
      educationInfo: { college: '', year: '', cgpa: '' },
      payment: { razorpay_order_id: '', razorpay_payment_id: '', razorpay_signature: '' },
      selectedCourses: [],
    };
    console.log(this.studentId);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.personalForm = this.personal.form;
      this.addressForm = this.address.form;
      this.educationForm = this.education.form;
      this.cdr.detectChanges(); // Manually trigger change detection
    }, 0);
  }
  userdetails(){setTimeout(() => {
    this.personalInfo = { ...this.personal.form.value }; // ✅ Ensures update is applied
    console.log('Updated Personal Info:', this.personalInfo); // ✅ Debugging
  });
  }
 
  
  generateStudentId(): string {
    const prefix = 'STU-';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let suffix = '';
  
    for (let i = 0; i < 4; i++) {
      suffix += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    return `${prefix}${suffix}`;
  }
  
   //Fetch selected courses before submitting
   getSelectedCourses(): Course[] {
    if (this.courseComponent) {
      return this.courseComponent.getSelectedCourses();
    }
    return [];
  }

  paymentSuccess: boolean = false; // ✅ Initially false

  // ✅ Method to update payment status from child component
  onPaymentSuccess(data: { paymentresponse: any; paymentid: boolean }) {
    this.paymentres = data.paymentresponse;
    this.paymentSuccess = data.paymentid;
    console.log('Payment Data from Child:', data);
    this.cdr.detectChanges();
  }
  payment1(){
    // Creates a new reference by spreading the array
  this.listofcourses = [...this.getSelectedCourses()];
  console.log('Updated List of Courses:', this.listofcourses);
  }

  submit(): void {
    if (this.personal.form.valid && this.address.form.valid && this.education.form.valid) {
      // Retrieve child form data
      
      this.addressInfo = this.address.form.value;
      this.educationInfo = this.education.form.value;

     
     
      //  Get courses directly from child
      this.listofcourses = this.getSelectedCourses();
      console.log('Submitted Personal Info Data:', this.personalInfo);
      console.log('Submitted Address Info Data:', this.addressInfo);
      console.log('Submitted Education Info Data:', this.educationInfo);
      console.log('Final Selected Courses:', this.listofcourses);
      console.log('Payment Response :', this.paymentres);
      
      this.studentData.studentid =this.studentId
      console.log('Student Id :', this.studentData.studentid);
      this.studentData.personalInfo=this.personalInfo;
      this.studentData.addressInfo = this.addressInfo;
      this.studentData.educationInfo = this.educationInfo;
      this.studentData.selectedCourses =this.listofcourses;
      this.studentData.payment = this.paymentres;
      this.dataServiceService.saveStudentData(this.studentData).subscribe((response) => {
        console.log(response);
        
      });
     
      this.router.navigate(['/thankyou',this.studentId]);
    } else {
      console.log('Child form is invalid.');
    }
  }
}
