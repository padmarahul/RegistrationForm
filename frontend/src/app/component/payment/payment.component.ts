import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataServiceService } from '../../service/data-service.service';
import { Course,PersonalInfo,Payment } from '../../modelData/model'; // ✅ Import interface

declare var Razorpay: any; // Declare Razorpay to avoid TypeScript errors

@Component({
  selector: 'app-payment',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent implements OnDestroy,OnInit{
  totalAmount: number = 0;
  paymentAmount: number = 0;
  paymentid: boolean = false; //  Initially false
  paymentId: string = ''; //  Store Payment ID
  orderId : String = '';
  paymentForm: FormGroup;
  paymentresponse! : Payment;
  @Output() paymentStatus = new EventEmitter<{ paymentresponse: any; paymentid: boolean }>();
  @Input() selectedCourses: Course[] = []; //  Receive data from parent
  @Input() personalInfo!: PersonalInfo;
  constructor(private fb: FormBuilder, private dataservice: DataServiceService, private cdr : ChangeDetectorRef,private ngZone: NgZone) {
    this.paymentForm = this.fb.group({
      amount: ['', []],
    });
  }
  ngOnDestroy(): void {
    this.paymentid = false;
  }
  ngOnInit(): void {
    this.paymentid = false;
    
  }


  ngOnChanges(changes: SimpleChanges) {
    if(changes['personalInfo']){
      console.log('Received Selected Courses in Payment:', this.personalInfo);
    }
    if (changes['selectedCourses']) {
      this.calculateTotal();
      console.log('Received Selected Courses in Payment:', this.selectedCourses);
    }
  }

  // ✅ Calculate total amount based on selected courses
  calculateTotal() {
    this.totalAmount = this.selectedCourses.reduce((sum, course) => sum + course.amount, 0);
    this.paymentAmount=this.totalAmount;
  }
  pay() {
    console.log('Payment started...');
    console.log('Payment amount:', this.paymentForm.get('amount')?.value);
    
    if (this.paymentForm.valid) {
      //const amount = this.paymentForm.get('amount')?.value;
      const amount = this.totalAmount
      const data = JSON.stringify({ amount: amount, info: 'Nari Request' });

      this.dataservice.paymentPost(data).subscribe({
        next: (result) => {
          console.log('Payment Success:', result);

          const RAZORPAY_OPTIONS = {
            key: 'rzp_test_itf2r7oaM0kg34', // Replace with your Razorpay Key ID
            amount: this.totalAmount,// Amount in paise (e.g., 1000 paise = ₹10)
            name: 'Elite Tech Academy',
            currency: 'INR',
            order_id: result.id, // Order ID from your backend
            description: 'COURSE REGISTRATION',
            image: 'https://livestatic.novopay.in/resources/img/nodeapp/img/Logo_NP.jpg',
            prefill: {
              name: '', // Prefill user's name (if available)
              email: 'test@test.com', // Prefill user's email (if available)
              contact: '', // Prefill user's contact number (if available)
            },
            theme: {
              color: '#0096C5', // Customize the payment dialog theme
            },
            handler: (response: any) => {
              this.getpaymentid(response)
              console.log('Payment successful:', response);
              console.log('Payment successful:', this.paymentid);
              this.paymentresponse = response;
              this.paymentid=true;
              this.paymentStatus.emit({ paymentresponse: this.paymentresponse, paymentid: this.paymentid });
              
            },
            modal: {
              ondismiss: () => {
                console.log('Payment dialog closed');
                alert('Payment cancelled or failed!');
                this.paymentid=false;
              },
            },
          };

          // Open the Razorpay payment dialog
          const rzp = new Razorpay(RAZORPAY_OPTIONS);
          rzp.open();
        },
        error: (error) => {
          console.error('Payment Failed:', error);
          this.paymentid=false;
          alert('Payment failed. Please try again.');
        },
      });
    } else {
      alert('Please enter a valid amount.');
    }
  }
  getpaymentid(response:any) {
    console.log('Payment Successful:', response);
    
    this.ngZone.run(() => {
      this.paymentid = true; // ✅ Hide the payment button section
      this.paymentId = response.razorpay_payment_id; 
      this.orderId = response.razorpay_order_id;


      this.cdr.detectChanges(); // ✅ Force UI to update
    });
  }
}