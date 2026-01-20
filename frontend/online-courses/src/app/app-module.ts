import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './services/auth-interceptor';



import { App } from './app.component';
import { Login } from './login/login.component';
import { NewUserDetails } from './new-user-details/new-user-details.component';
import { routes } from './app-routing-module';
import { Courses } from './courses/courses.component';
import { CourseForm } from './course-form/course-form.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MenuLayout } from './layout/menu-layout/menu-layout';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgChartsModule } from 'ng2-charts';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgApexchartsModule } from 'ng-apexcharts';






import { Students } from './students/students';
import { Instructors } from './instructors/instructors';
import { Profile } from './profile/profile';
import { ConfirmDialog } from './shared/confirm-dialog/confirm-dialog';
import { Assignments } from './assignments/assignments';
import { Submission } from './submission/submission';
import { ChangePasswordDialog } from './change-password-dialog/change-password-dialog';
import { AssignmentSubmit } from './assignment-submit/assignment-submit';
import { StudentSubmission } from './student-submission/student-submission';
import { AssignmentForm } from './assignment-form/assignment-form';
import { CourseEnrollments } from './course-enrollments/course-enrollments';
import { MyEnrollments } from './my-enrollments/my-enrollments';
import { StudentPayments } from './student-payments/student-payments';
import { InstructorPayments } from './instructor-payments/instructor-payments';
import { ChatPage } from './chat-page/chat-page';
import { NewChatDialog } from './new-chat-dialog/new-chat-dialog';
import { GroupChatDialog } from './group-chat-dialog/group-chat-dialog';
import { InstructorEarning } from './instructor-earning/instructor-earning';
import { AdminUsers } from './admin-users/admin-users';
import { ChangeRoleDialog } from './change-role-dialog/change-role-dialog';
import { CoursePayments } from './course-payments/course-payments';
import { SubmitReview } from './submit-review/submit-review';
import { CourseReview } from './course-review/course-review';
import { AssignmnentConfirmDialog } from './assignmnent-confirm-dialog/assignmnent-confirm-dialog';
import { EnrollCourseDialog } from './shared/enroll-course-dialog/enroll-course-dialog';
import { Support } from './support/support';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
import { StudentAiChat } from './student-ai-chat/student-ai-chat';
import { ApproveInstructorsDialog } from './approve-instructors-dialog/approve-instructors-dialog';
import { StudentDashboard } from './student-dashboard/student-dashboard';




@NgModule({
  declarations: [
    App,
    Login,
    NewUserDetails,
    Courses,
    CourseForm,
    MenuLayout,
    Students,
    Instructors,
    Profile,
    ConfirmDialog,
    Assignments,
    Submission,
    ChangePasswordDialog,
    AssignmentSubmit,
    StudentSubmission,
    AssignmentForm,
    CourseEnrollments,
    MyEnrollments,
    StudentPayments,
    InstructorPayments,
    ChatPage,
    NewChatDialog,
    GroupChatDialog,
    InstructorEarning,
    AdminUsers,
    ChangeRoleDialog,
    CoursePayments,
    SubmitReview,
    CourseReview,
    AssignmnentConfirmDialog,
    EnrollCourseDialog,
    Support,
    AdminDashboard,
    StudentAiChat,
    ApproveInstructorsDialog,
    StudentDashboard,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    ReactiveFormsModule,

    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatTooltip,
    MatDialogModule,
    MatMenuModule, 
    MatProgressBarModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSlideToggleModule,
    NgChartsModule,
    MatProgressSpinnerModule,
    NgApexchartsModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([authInterceptor]))
  ],
  bootstrap: [App]
})
export class AppModule { }
