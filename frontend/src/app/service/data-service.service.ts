import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private apiUrl = 'http://localhost:8080/api/'; // Replace with your Spring Boot API URL

  constructor(private http: HttpClient) {}

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  });

  // ✅ GET Data Request
  getData(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl + 'form', { withCredentials: true });
  }

  // ✅ POST Payment Request
  paymentPost(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'payment', data, { headers: this.headers });

  }
  saveStudentData(studentData: any): Observable<string> {
    return this.http.post<string>(this.apiUrl + 'student', studentData,{ headers: this.headers });
  }

}
