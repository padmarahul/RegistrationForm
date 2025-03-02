import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-thankyou',
  imports: [],
  templateUrl: './thankyou.component.html',
  styleUrl: './thankyou.component.css'
})
export class ThankyouComponent {
  studentId: string = '';
   constructor(private router: Router,private route: ActivatedRoute) {}
    submit(){
      this.router.navigate(['/']);
  
    }
    ngOnInit() {
      // Access the studentId route parameter
      this.studentId = this.route.snapshot.paramMap.get('studentId') || '';
      console.log('Student ID in Target Component:', this.studentId);
    }

}
