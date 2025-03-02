export interface PersonalInfo {
    name: string;
    email: string;
    phoneNumber: string;
  }
  export interface AddressInfo {
    address: string;
    city: string;
    state: string;
    country : String;
    zipcode: String;
  }
  export interface EducationInfo {
    college: string;
    year: string;
    cgpa: string;
  }
  export interface Course {
    courseName: string;
    amount: number;
    courseId: number;
  }
  export interface Payment {
    razorpay_order_id : String;
    razorpay_payment_id : String;
    razorpay_signature : String;

  }
  export interface StudentData {
    studentid : String;
    personalInfo: PersonalInfo;
    addressInfo: AddressInfo;
    educationInfo: EducationInfo;
    payment: Payment;
    selectedCourses: Course[];
  }

  