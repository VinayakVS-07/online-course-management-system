import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiUrl = 'http://localhost:5207/api/Users';

  constructor(private http: HttpClient) {}


  // ----------------LOGIN AUTHENTICATION & REGISTRATION ----------------

 // User Login + JWT Token Storage 

  login(credentials: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
    tap((res: any) => {
      if (res.success && res.token) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res));
      }
    })
  );
}

// Register User

  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

// Send OTP to email

sendOtp(email: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/send-otp`, { email });
}

// Register User after OTP verification

verifyOtpAndRegister(user: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/register-verify`, user);
}


// ---------------- STUDENTS & INSTRUCTORS ----------------

 // Fetch students with filter

getStudents(filter: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/students`, filter);
}

 // Fetch instructors with filter

getInstructors(filter: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/instructors`, filter);
}

// Student's Dashboard

   getStudentDashboard(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard/${userId}`);
  }

  getUserId(): number {
  // return parsed user id from your JWT/session
  return Number(localStorage.getItem('userId'));
}

 // ---------------- PROFILE & PASSWORD ----------------

 // Get user profile

getUserProfile(userId: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/${userId}`);
}

 // Update user profile

updateUserProfile(data: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/EditProfile`, data);
}

// Change user password

changePassword(data: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/change-password`, data);
}

// Get logged-in user's role

getUserRole(): string {
  const user = this.getLoggedInUser();
  return user?.role || '';
}


 // ---------------- COURSE MANAGEMENT ----------------

 // Fetch all courses

  courses(): Observable<any> {
  return this.http.get(`${this.apiUrl}/courses`);
}

// Fetch courses with filters

  coursesByFilter(filter: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/courses`, filter);
}

 // Save or update a course

saveCourse(course: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/save-course`, course);
}

// Fetch course by ID

getCourseById(id: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/course/${id}`);
}

 // Get all course categories

getAllCategories(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/categories`);
}

// Add new course category

addCategory(data: { name: string; description?: string }): Observable<any> {
  return this.http.post(`${this.apiUrl}/add-category`, data);
}

 // Get basic course list

getBasicCourses() {
  return this.http.get<any[]>(`${this.apiUrl}/basic-courses`);
}


 // ---------------- ASSIGNMENTS & SUBMISSIONS ----------------

 // Fetch assignments with filters

 getAssignments(filter: {
    courseID?: number | null;
    page: number;
    pageSize: number;
    searchTerm?: string;
  }): Observable<{ assignments: any[]; totalCount: number }> {
    return this.http.post<{ assignments: any[]; totalCount: number }>(
      `${this.apiUrl}/assignments`,
      filter
    );
  }

  // Toggle assignment active status

toggleAssignmentStatus(id: number, isActive: boolean) {
  return this.http.put(`${this.apiUrl}/assignments/${id}/status`, { isActive });
}

 // Submit assignment

submitAssignment(payload: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/submit-assignment`, payload);
}

// Fetch assignment by ID

getAssignmentById(id: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/assignment/${id}`);
}

// Save assignment

saveAssignment(data: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/save-assignment`, data);
}

// Get submissions for an assignment

   getSubmissionsByAssignment(assignmentId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/by-assignment/${assignmentId}`
    );
  }

  
 // Upload assignment file

uploadAssignmentFile(file: File): Observable<any> {
  const formData = new FormData();
  formData.append('file', file);
  return this.http.post(`${this.apiUrl}/upload-assignment-file`, formData);
}

  // Get full file URL for preview/download

getFullFileUrl(relativePath: string): string {
  return `http://localhost:5207${relativePath}`;
}

 // Grade and feedback for each submission

  gradeSubmission(data: {
  submissionID: number,
  grade: number,
  feedback: string,
  modifiedBy: string
}): Observable<any> {
    return this.http.post(`${this.apiUrl}/grade`, data);
}

// Get student's submissions

getStudentSubmissions(userId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/student-submissions/${userId}`);
}


 // ---------------- ENROLLMENTS ----------------

 // Enroll a student in a course

enrollStudent(data: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/enroll`, data);
}

 // Get enrollments by course

getEnrollmentsByCourse(courseId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/course/${courseId}/enrollments`);
}

// Get enrollments by user

getUserEnrollments(userId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/enrollments/${userId}`);
}


 // ---------------- PAYMENTS ----------------

 // Make a payment and enroll

makePayment(data: {
  userID: number;
  courseID: number;
  amount: number;
  paymentStatus: string;
  createdBy: string;
}): Observable<any> {
  return this.http.post(`${this.apiUrl}/make-payment-enroll`, data);
}

 // Get payments by course

getPaymentsByCourse(courseId: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/payments/by-course/${courseId}`);
}

// Get student payments

getStudentPayments(userId: number): Observable<any[]> {
  return this.http.post<any[]>(`${this.apiUrl}/student-payments/${userId}`,{});
}

// Get instructor payments

getInstructorPayments(filter: {
  page: number;
  pageSize: number;
  searchTerm?: string;
}): Observable<{ payments: any[]; totalCount: number }> {
  return this.http.post<{ payments: any[]; totalCount: number }>(
    `${this.apiUrl}/all-payments`,
    filter
  );
}

// Get instructor earnings

getInstructorEarnings(instructorId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/instructor-earnings/${instructorId}`);
}

 // ---------------- MESSAGING & GROUP CHAT ----------------

 // Send chat message

sendMessage(message: {
  senderID: number;
  receiverID: number;
  message: string;
}): Observable<any> {
  return this.http.post(`${this.apiUrl}/send-chat`, message);
}

// Get users by role

getUsersByRole(roleName: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/users-by-role/${roleName}`);
}

 // Get chat users for a user

getChatUsers(userId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/chat-users/${userId}`);
}

 // Mark messages as read

markAsRead(data: { senderID: number; receiverID: number }): Observable<any> {
  return this.http.post(`${this.apiUrl}/mark-as-read`, data);
}

 // Get unread message count

getUnreadMessageCount(userId: number): Observable<{ count: number }> {
  return this.http.get<{ count: number }>(`${this.apiUrl}/unread-count/${userId}`);
}

// Get total unread count for user

getTotalUnreadCount(userID: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/total-unread-count/${userID}`);
}

 // Get chat history between two users

getChatHistory(user1: number, user2: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/chat-history/${user1}/${user2}`);
}

// Create group chat

createGroupChat(payload: {
  groupName: string;
  createdBy: number;
  participantIDs: number[];
}): Observable<any> {
  return this.http.post(`${this.apiUrl}/create-group-chat`, payload);
}

 // Get group chat history

getGroupChatHistory(groupID: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/group-chat/${groupID}`);
}

  // Send message to group

sendGroupMessage(data: { groupID: number, senderID: number, message: string }): Observable<any> {
  return this.http.post(`${this.apiUrl}/send-group-message`, data);
}

// Mark group messages as read

markGroupMessagesAsRead(data: { groupID: number; userID: number }): Observable<any> {
  return this.http.post(`${this.apiUrl}/mark-group-read`, data);
}


 // ---------------- ADMIN VIEW ----------------

 // Get all users list for admin with filters

getAllUsers(filter: {
   searchTerm?: string | null,
  roleName?: string | null,
  page: number,
  pageSize: number
}): Observable<{ users: any[], totalCount: number }> {
  return this.http.post<{ users: any[], totalCount: number }>(
    `${this.apiUrl}/admin-users`,
    filter
  );
}


// user.service.ts
getPendingInstructors() {
  return this.http.get<any[]>(`${this.apiUrl}/pending-instructors`);
}

approveInstructor(userId: number) {
  return this.http.post(`${this.apiUrl}/approve-instructor/${userId}`, {});
}



 // Toggle user status (active/inactive)

toggleUserStatus(userId: number): Observable<any> {
  return this.http.put(`${this.apiUrl}/toggle-user-status/${userId}`, {});
}

// Get all roles

getAllRoles(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/roles`);
}

 // Update user role

updateUserRole(payload: { userID: number; newRoleID: number; modifiedBy: string }): Observable<any> {
  return this.http.post(`${this.apiUrl}/update-role`, payload);
}
 
// Admin Dashboard 

getAdminDashboardData(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/admin-dashboard`);
}



// ---------------- COURSE REVIEWS ----------------

// Submit or update a course review

addOrUpdateCourseReview(payload: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/course-reviews`, payload);
}

 // Get course reviews

getCourseReviews(courseID: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/course-reviews/${courseID}`);
}


// ---------------- SUPPORT ----------------

// Send support request

sendSupportRequest(data: {
  userID: number;
  subject: string;
  message: string;
}): Observable<any> {
  return this.http.post(`${this.apiUrl}/send`, data);
}


// ---------------- AI CHATBOT CALL ----------------


  sendMessageToAI(message: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/chat`, { message });
  }





 // ---------------- SESSION HELPERS ----------------

 // Logout user

  logout(): void {
    localStorage.removeItem('user');
  }

  // Check if user is logged in

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

   // Get user from local storage

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Get logged-in user details

  getLoggedInUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}



}