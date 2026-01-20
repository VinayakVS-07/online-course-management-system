import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Auth } from '../services/auth.service';
import { MatTableDataSource } from '@angular/material/table';

// Interface for submission structure

interface Submissions {
  submissionID: number;
  userID: number;
  studentName: string;
  submissionOn: string;
  grade: number | null;
  feedback: string;
  fileURL: string;
}


@Component({
  selector: 'app-submission',
  standalone: false,
  templateUrl: './submission.html',
  styleUrl: './submission.css'
})
export class Submission implements OnInit  {
 assignmentId!: number;
  dataSource = new MatTableDataSource<Submission>();

// Table column headers

  displayedColumns = ['studentName', 'submissionOn', 'fileURL', 'grade', 'feedback', 'actions'];

  constructor(private route: ActivatedRoute, private auth: Auth) {}

 // Fetch assignment ID and load submissions

  ngOnInit() {
    this.assignmentId = +this.route.snapshot.paramMap.get('id')!;
    console.log('Assignment ID:', this.assignmentId);
    this.loadSubmissions();
  }

// Load all submissions for the current assignment

  loadSubmissions() {
    this.auth.getSubmissionsByAssignment(this.assignmentId)
      .subscribe(list => this.dataSource.data = list);
  }

// Save grade and feedback for a specific submission

 save(row: any) {
  this.auth.gradeSubmission({
    submissionID: row.submissionID,
    grade: row.grade || 0,
    feedback: row.feedback || '',
    modifiedBy: this.auth.getUser()?.firstName || 'instructor'
  }).subscribe({
    next: () => {
      alert('Grade updated');
      this.loadSubmissions(); // Refresh list after update
    },
    error: () => alert('Failed to update grade')
  });
 }
 
}
