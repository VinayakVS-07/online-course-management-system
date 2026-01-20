import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-assignment-submit',
  standalone: false,
  templateUrl: './assignment-submit.html',
  styleUrl: './assignment-submit.css'
})
export class AssignmentSubmit implements OnInit {
  assignmentID!: number;
  assignment: any;
  submissionURL: string = '';
  courseId: number = 0;
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    public auth: Auth,
    private router: Router
  ) {}

     ngOnInit(): void {

// Get assignment ID 

    this.assignmentID = +this.route.snapshot.paramMap.get('id')!;

// Load assignment list and find the one by ID

    this.auth.getAssignments({ courseID: null, page: 1, pageSize: 100 }).subscribe({
      next: (res) => {
        this.assignment = res.assignments.find((a: any) => a.assignmentID === this.assignmentID);
        this.courseId = this.assignment?.courseID;
      },
      error: () => alert('Failed to load assignment')
    });
  }

// Handle file section

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] || null;
  }

  // Submit assignment (File or URL)

  submitAssignment() {
    const user = this.auth.getLoggedInUser();
    if (!user || (!this.submissionURL && !this.selectedFile)) {
    alert('Please provide a file URL or upload a file.');
    return;
  }

  // Function to finalize and send submission payload

     const finalizeSubmission = (finalURL: string) => {
    const payload = {
      userID: user.userID,
      courseID: this.courseId,
      assignmentID: this.assignmentID,
      fileURL: finalURL,
      createdBy: user.firstName || 'student'
    };

    this.auth.submitAssignment(payload).subscribe({
      next: () => {
        alert('Assignment submitted successfully');
        this.router.navigate(['/assignments']);
      },
      error: () => alert('Failed to submit assignment')
    });
   };

    if (this.selectedFile) {
    this.auth.uploadAssignmentFile(this.selectedFile).subscribe({
      next: (res: any) => {
        finalizeSubmission(res.fileURL);
      },
      error: () => alert('File upload failed')
    });
  } else {
    finalizeSubmission(this.submissionURL);
  }
}
}