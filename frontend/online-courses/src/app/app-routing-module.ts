import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard';

import { Login } from './login/login.component';
import { NewUserDetails } from './new-user-details/new-user-details.component';
import { Courses } from './courses/courses.component';
import { CourseForm } from './course-form/course-form.component';
import { MenuLayout } from './layout/menu-layout/menu-layout';
import { Students } from './students/students';
import { Instructors } from './instructors/instructors';
import { Profile } from './profile/profile';
import { Support } from './support/support';

import { Assignments } from './assignments/assignments';
import { AssignmentForm } from './assignment-form/assignment-form';
import { AssignmentSubmit } from './assignment-submit/assignment-submit';
import { Submission } from './submission/submission';
import { StudentSubmission } from './student-submission/student-submission';
import { CourseEnrollments } from './course-enrollments/course-enrollments';
import { MyEnrollments } from './my-enrollments/my-enrollments';
import { StudentPayments } from './student-payments/student-payments';
import { InstructorPayments } from './instructor-payments/instructor-payments';
import { ChatPage } from './chat-page/chat-page';
import { InstructorEarning } from './instructor-earning/instructor-earning';

import { AdminUsers } from './admin-users/admin-users';
import { CoursePayments } from './course-payments/course-payments';
import { SubmitReview } from './submit-review/submit-review';
import { CourseReview } from './course-review/course-review';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { StudentDashboard } from './student-dashboard/student-dashboard';

export const routes: Routes = [
   { path: '', redirectTo: 'login', pathMatch: 'full' },
   { path: 'login', component: Login },
   { path: 'new-user-details', component: NewUserDetails },
   { path: 'profile', component: Profile, canActivate: [AuthGuard] },


    {
    path: '',
    component: MenuLayout,
    canActivate: [AuthGuard],
    children: [
      { path: 'courses', component: Courses },
      { path: 'add-course', component: CourseForm },
      { path: 'edit-course/:id', component: CourseForm },
      { path: 'students', component: Students},
      { path: 'instructors', component: Instructors},
      { path: 'assignments', component: Assignments },
      { path: 'assignments/:id/submissions', component: Submission },
      { path: 'assignments/:id/submit', component: AssignmentSubmit },
      { path: 'my-submissions',component: StudentSubmission,canActivate: [AuthGuard]},
      { path: 'assignments/create', component: AssignmentForm },
      { path: 'assignments/edit/:id', component: AssignmentForm },
      { path: 'courses/:id/enrollments', component: CourseEnrollments },
      { path: 'my-enrollments', component: MyEnrollments },
      { path: 'my-payments' , component: StudentPayments},
      { path: 'payments', component: InstructorPayments },
      { path: 'chat', component: ChatPage},
      { path: 'instructor/earnings', component: InstructorEarning},
      { path: 'admin-users', component: AdminUsers },
      { path: 'course/:id/payments',component: CoursePayments},
      { path: 'submit-review/:id', component: SubmitReview },
      { path: 'course-reviews/:id', component: CourseReview },
      { path: 'support', component: Support },
      { path: 'admin-dashboard', component: AdminDashboard},
      { path: 'student-dashboard', component: StudentDashboard}








    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
