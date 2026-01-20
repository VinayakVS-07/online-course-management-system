import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '../services/auth.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-assignment-form',
  standalone: false,
  templateUrl: './assignment-form.html',
  styleUrl: './assignment-form.css'
})
export class AssignmentForm implements OnInit  {
 assignmentForm!: FormGroup;
  isEditMode = false;
  assignmentId: number = 0;
  courses: any[] = [];
  selectedFile: File | null = null;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: Auth
  ) {}

  ngOnInit(): void {

    // Load all basic courses for dropdown

    this.auth.getBasicCourses().subscribe({
  next: (res) => {
    this.courses = res;
  },
  error: (err) => {
    console.error('Failed to load courses', err);
    this.courses = [];
  }
});

// Get assignment ID from route and initialize form

    this.assignmentId = +this.route.snapshot.paramMap.get('id')!;
    this.initForm();

    // If ID is present, load assignment details to edit

     if (this.assignmentId && this.assignmentId > 0) {
    this.isEditMode = true;
    this.auth.getAssignmentById(this.assignmentId).subscribe({
      next: (data) => {
         
        this.assignmentForm.patchValue({
          assignmentID: data.assignmentID,
          courseID: data.courseID,
          title: data.title,
          description: data.description,
          dueDate: data.dueDate?.substring(0, 10), 
          fileURL: data.fileURL,
          createdBy: data.createdBy,
          modifiedBy: data.modifiedBy || 'admin'
        });
      },
      error: () => alert('Failed to load assignment details')
    });
  }
}

// INITIALIZES FORM GROUP WITH VALIDATORS

  initForm() {
    this.assignmentForm = this.fb.group({
      assignmentID: [0],
      courseID: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      fileURL: [''],
      createdBy: ['admin'],
      modifiedBy: ['admin']
   }, { validators: this.dateValidator.bind(this) });
  }

// Proper validation in due date 

  dateValidator(control: AbstractControl): ValidationErrors | null {
  const form = control as FormGroup;
  const dueDate = new Date(form.get('dueDate')?.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!this.isEditMode && dueDate < today) {
    return { dueDatePast: true };
  }

  return null;
}

// Handle file input section

onFileSelected(event: any) {
  this.selectedFile = event.target.files?.[0] || null;
}

// Form submit logic

  onSubmit() {
    if (this.assignmentForm.invalid) {
    this.assignmentForm.markAllAsTouched();
    return;
  }

  const saveAssignmentData = () => {
    const data = { ...this.assignmentForm.value };
    if (data.dueDate instanceof Date) {
      data.dueDate = data.dueDate.toISOString().split('T')[0];
    }
    
    this.auth.saveAssignment(data).subscribe({
      next: (res) => {
        alert(res.message || 'Assignment saved');
        this.router.navigate(['/assignments']);
      },
      error: (err) => {
        console.error('Save failed', err);
        alert('Failed to save assignment');
      }
    });
     };

   if (this.selectedFile) {
    this.auth.uploadAssignmentFile(this.selectedFile).subscribe({
      next: (res) => {
        this.assignmentForm.patchValue({ fileURL: res.fileURL });
        saveAssignmentData();
      },
      error: (err) => {
        console.error('Upload failed', err);
        alert('File upload failed');
      }
    });
  } else {
    saveAssignmentData();
  }
}
}
