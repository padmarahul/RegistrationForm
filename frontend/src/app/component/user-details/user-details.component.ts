import { Component, OnInit } from '@angular/core';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { DataServiceService } from '../../service/data-service.service';
import { error } from 'console';

@Component({
  selector: 'app-user-details',
  standalone: true,  // ✅ Required for using `provideHttpClient()`
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  
 
})
export class UserDetailsComponent implements OnInit {
  data : string[] =[];
  constructor(private dataservice : DataServiceService  ) {}
  ngOnInit(): void {
      this.fetchData();
  }
  fetchData() {
    this.dataservice.getData().subscribe(
      (res) => {
        this.data = res;
      },
      (error) => {
        console.error('Error While Fetching Data:',error)
      }
    );
  }
}
