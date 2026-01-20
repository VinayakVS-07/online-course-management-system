import { Component, OnInit } from '@angular/core';
import { Auth } from '../services/auth.service';

interface EnrolledCourse {
  enrollmentID: number;
  courseID: number;
  title: string;
  instructorName: string;
  enrollmentDate: string;
  status: string;
  totalAssigned: number;
  totalSubmitted: number;
  progress: number;
}

interface Submission {
  submissionID: number;
  assignmentID: number;
  courseID: number;
  assignmentTitle: string;
  courseTitle: string;
  fileURL: string;
  submissionOn: string;
  grade: number;
  feedback: string;
}

interface StudentsDashboard {
  enrolledCourses: EnrolledCourse[];
  submissions: Submission[];
  totalCourses: number;
  overallProgress: number;
  completionRate: number;
  averageGrade: number;
}

@Component({
  selector: 'app-student-dashboard',
  standalone: false,
  templateUrl: './student-dashboard.html',
  styleUrl: './student-dashboard.css'
})
export class StudentDashboard implements OnInit {
  dashboardData!: StudentsDashboard;
  loading = true;
  error: string | null = null;
  userId!: number;
  progressChart: any;
  gradeChart: any;
 

  constructor(private auth: Auth) {}

  ngOnInit(): void {
   const user = this.auth.getLoggedInUser();
    this.auth.getStudentDashboard(user.userID).subscribe({
      next: (data: StudentsDashboard) => {
        this.dashboardData = data;
        this.setupCharts();
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load dashboard data';
        this.loading = false;
      }
    });
  }

  setupCharts() {
    this.progressChart = {
      chart: { type: 'radialBar' },
      series: [this.dashboardData.overallProgress],
      labels: ['Overall Progress'],
      colors: ['#3f51b5']
    };

    this.gradeChart = {
      chart: { type: 'radialBar' },
      series: [this.dashboardData.averageGrade],
      labels: ['Average Grade'],
      colors: ['#4caf50']
    };
  }
}