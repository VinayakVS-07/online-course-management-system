import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-course-form',
  standalone: false,
  templateUrl: './course-form.component.html',
 styleUrls: ['./course-form.component.css']

})
export class CourseForm implements OnInit {

// FORM STATE & VARIABLES

  courseForm: FormGroup;
  isEditMode = false;
  instructors: any[] = [];
  categories: any[] = [];
  selectedCategoryOption: string = 'existing';
  

  courseId: number = 0;
   constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: Auth
  ) {

// FORM INITIALIZATION AND VALIDTION

    this.courseForm = this.fb.group({
      courseID: [0],
      title: ['', Validators.required],
      description: [''],
      categoryID: [''],
      newCategoryName: [''],
      categoryOption: ['existing'],
      userID: ['', Validators.required],
      duration: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0.01)]],
      status: ['Active'],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      createdBy: ['admin'],
      modifiedBy: ['admin']
   }, { validators: [this.dateValidator, this.categoryValidator] });
 
  }

  ngOnInit(): void {

    // Load instructors for dropdown

 this.auth.getInstructors({ page: 1, pageSize: 1000, searchTerm: '' }).subscribe({
  next: (res) => {
    console.log('Instructor dropdown data:', res);
    this.instructors = res.instructors || []; 
  },
  error: (err) => {
    console.error('Error loading instructors:', err);
    this.instructors = [];
  }
});

// Load existing categories for dropdown

this.auth.getAllCategories().subscribe({
  next: (res: any[]) => {
    this.categories = res;
  },
  error: (err) => {
    console.error('Failed to load categories:', err);
    this.categories = [];
  }
});

// If editing existing course, load course data

    this.courseId = +this.route.snapshot.paramMap.get('id')!;
    if (this.courseId) {
      this.isEditMode = true;
      
      this.auth.getCourseById(this.courseId).subscribe((course) => {
      const categoryId = course.categoryID ?? course.categoryId ?? null;
      this.courseForm.patchValue({
    ...course,
    courseID: this.courseId,
    categoryID: categoryId
    });
  });
    }
  
  }

   // DATE VALIDATION LOGIC

  dateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const form = control as FormGroup;

  const start = form.get('startDate')?.value;
  const end = form.get('endDate')?.value;

 if (!start || !end) return null;

  const startDate = new Date(start);
  const endDate = new Date(end);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const errors: any = {};

  if (!this.isEditMode && startDate < today) {
    errors.startDatePast = true;
  }

  if (endDate < startDate) {
    errors.dateInvalid = true;
  }

  return Object.keys(errors).length ? errors : null;
};

// CATEGORY VALIDATION LOGIC

categoryValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const form = control as FormGroup;
  const option = form.get('categoryOption')?.value;
  const existingCategory = form.get('categoryID')?.value;
  const newCategory = form.get('newCategoryName')?.value?.trim();

  if (option === 'existing' && !existingCategory) {
    return { categoryRequired: true };
  }

  if (option === 'new' && !newCategory) {
    return { newCategoryRequired: true };
  }

  return null;
};

// HANDLE FORM SUBMISSION

 onSubmit() {
  if (this.courseForm.invalid) {
    this.courseForm.markAllAsTouched();
    return;
  }

  const formValue = this.courseForm.value;

  // Handle new category creation if selected

  if (formValue.categoryOption === 'new' && formValue.newCategoryName) {

    const newCategory = {
      name: formValue.newCategoryName,
      description: '' // Add description if needed
    };

    this.auth.addCategory(newCategory).subscribe({
      next: (res) => {
        this.courseForm.patchValue({ categoryID: res.categoryID });
        this.saveCourse(); // call final save
      },
      error: (err) => {
        console.error('Failed to save new category:', err);
        alert('Error saving new category');
      }
    });
  } else {
    this.saveCourse(); // existing category path
  }
}

// FINAL SAVE COURSE FUNCTION

saveCourse() {
  const data = this.courseForm.value;
  this.auth.saveCourse(data).subscribe({
    next: (res: any) => {
      if (res.success) {
        alert(res.message);
        this.router.navigate(['/courses']);
      } else {
        alert('Failed to save course.');
      }
    },
    error: (err) => {
      console.error('Save error:', err);
      alert('Error saving course');
    }
  });
}

 
}
