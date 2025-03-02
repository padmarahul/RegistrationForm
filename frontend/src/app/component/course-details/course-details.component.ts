import { Component, ChangeDetectorRef } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Course } from '../../modelData/model'; // ✅ Import interface

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [MatListModule, CommonModule, MatCheckboxModule, FormsModule],
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent {
  listofcourses: Course[] = []; // ✅ Stores selected courses

  courses: Course[] = [
    { courseName: 'Angular Basics', amount: 30000, courseId: 101 },
    { courseName: 'React Fundamentals', amount: 40000, courseId: 102 },
    { courseName: 'Node.js Mastery', amount: 35000, courseId: 103 },
    { courseName: 'Spring Boot API', amount: 50000, courseId: 104 },
    { courseName: 'Vue.js Essentials', amount: 32000, courseId: 105 },
    { courseName: 'TypeScript Deep Dive', amount: 28000, courseId: 106 },
    { courseName: 'Python for Data Science', amount: 45000, courseId: 107 },
    { courseName: 'Machine Learning with TensorFlow', amount: 60000, courseId: 108 },
    { courseName: 'Deep Learning with PyTorch', amount: 58000, courseId: 109 },
    { courseName: 'Java Spring Boot Microservices', amount: 55000, courseId: 110 },
    { courseName: 'AWS Cloud Practitioner', amount: 50000, courseId: 111 },
    { courseName: 'Azure Fundamentals', amount: 48000, courseId: 112 },
    { courseName: 'Google Cloud Associate', amount: 49000, courseId: 113 },
    { courseName: 'Docker & Kubernetes Mastery', amount: 53000, courseId: 114 },
    { courseName: 'Cybersecurity Essentials', amount: 47000, courseId: 115 },
    { courseName: 'Full-Stack Web Development', amount: 62000, courseId: 116 },
    { courseName: 'Android App Development', amount: 50000, courseId: 117 },
    { courseName: 'iOS App Development with Swift', amount: 51000, courseId: 118 },
    { courseName: 'Blockchain Development', amount: 70000, courseId: 119 },
    { courseName: 'DevOps with Jenkins & Ansible', amount: 55000, courseId: 120 },
    { courseName: 'Big Data with Hadoop & Spark', amount: 60000, courseId: 121 },
    { courseName: 'SQL & Database Management', amount: 42000, courseId: 122 },
    { courseName: 'Data Structures & Algorithms', amount: 58000, courseId: 123 },
    { courseName: 'AI & Natural Language Processing', amount: 75000, courseId: 124 },
    { courseName: 'Computer Vision with OpenCV', amount: 68000, courseId: 125 }
  ];

  constructor(private cdr: ChangeDetectorRef) {} // ✅ Inject ChangeDetectorRef

  onCourseChange(course: Course, event: any) {
    console.log('Event Triggered:', event); // ✅ Debugging event trigger

    // Check if the course is already selected
    if (this.listofcourses.some(c => c.courseId === course.courseId)) {
      this.listofcourses = this.listofcourses.filter(c => c.courseId !== course.courseId);
    } else {
      this.listofcourses.push(course);
    }

    console.log('Updated Selected Courses:', [...this.listofcourses]); // ✅ Debugging updated list

    this.cdr.detectChanges(); // ✅ Force Angular to detect changes
  }

  // ✅ Ensures checkboxes are correctly marked when data updates
  isChecked(course: Course): boolean {
    return this.listofcourses.some(c => c.courseId === course.courseId);
  }

  // ✅ Expose method to return selected courses to parent
  getSelectedCourses(): Course[] {
    return this.listofcourses;
  }

  // ✅ Track function for ngFor performance optimization
  trackByCourse(index: number, course: Course): number {
    return course.courseId;
  }
}
