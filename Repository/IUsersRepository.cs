using Microsoft.OpenApi.Any;
using OnlineCourseApi.Models;

namespace OnlineCourseApi.Repository
{
    public interface IUsersRepository
    {
        public Task<Users> GetUserByIDAsync(int userId);

        public Task<IEnumerable<StudentEntrolled>> GetStudentBYcourseAsync(int CourseID);
        public Task<IEnumerable<Instructor>> GetCoursesByInstructorAsync(int UserID);
        public Task<IEnumerable<CourseCount>> CountEntrolledStudentsAsync();
        public Task<IEnumerable<TotalEarning>> TotalEarningPerCourseAsync();
        public Task<IEnumerable<NotEntrolled>> GetCoursesNotEnrolledByUserAsync(int UserID);
        public Task<IEnumerable<CourseAssignment>> GetAssignmentsByCourseAsync(int CourseID);
        public Task<IEnumerable<NoAssignmentSubmissoin>> GetStudentNotSubmittedAssignmentAsync();
        public Task<IEnumerable<Top5Courses>> GetTop5CoursesAsync();
        public Task<bool> UpdateCourseDescriptionAsync(UpdateDescription upd);
        public Task<IEnumerable<StudentProgress>> StudentProgressAsync();
        public Task<int> DeleteUnEnrolledStudentsAsync();
        public Task<Payments> AddPaymentWithDiscountAsync(Payments pay);
        public Task<IEnumerable<PaymentDetails>> PaymentDetailsAsync();
        public Task<IEnumerable<Top5Students>> GetTop5StudentsAsync();







        public Task<Users?> AuthenticateUserAsync(string email);
        public Task<bool> RegisterUserAsync(RegisterUser user);
        public Task<bool> SaveEmailOtpAsync(string email, string otp);
        public Task<EmailOtp> GetValidOtpAsync(string email, string otp);
        public Task MarkOtpAsUsedAsync(int otpId);
        public Task<(IEnumerable<Courses> Courses, int TotalCount)> GetCoursesWithFiltersAsync(string search, int page, int pageSize);
        public Task<bool> SaveCourseAsync(SaveCourse course);
        public Task<SaveCourse> GetCourseByIdAsync(int courseId);
        public Task<(IEnumerable<GetStudents> Students, int TotalCount)> GetStudentsAsync(GetStudents pag);
        public Task<(IEnumerable<GetInstructor> Instructors, int TotalCount)> GetInstructorAsync(GetInstructor paged);
        public Task<UserProfile> GetUserProfileAsync(int userId);
        public Task<bool> UpdateUserProfileAsync(UserProfile model);
        public Task<(IEnumerable<AssignmentView> Assignments, int TotalCount)> GetAssignmentsAsync(int? courseId, int page, int pageSize, string searchTerm = "");
        public Task ToggleAssignmentStatusAsync(int assignmentId, bool isActive);
        public Task<IEnumerable<SubmissionView>> GetSubmissionsByAssignmentAsync(int assignmentId);
        public Task<bool> ChangePasswordAsync(int userId, string currentPassword, string newPassword);
        public Task<bool> SubmitAssignmentAsync(SubmissionCreate submission);
        public Task<bool> GradeSubmissionAsync(int submissionId, decimal grade, string feedback, string modifiedBy);
        public Task<IEnumerable<StudentSubmissionView>> GetStudentSubmissionsAsync(int userId);
        public Task<bool> SaveAssignmentAsync(SaveAssignment model);
        public Task<SaveAssignment?> GetAssignmentByIdAsync(int id);
        public Task<bool> EnrollStudentAsync(int userId, int courseId, string createdBy);
        public Task<bool> MakePaymentAndEnrollAsync(PaymentModel model);
        public Task<EnrollmentEmailDto> GetEnrollmentConfirmationDetailsAsync(int userId, int courseId);
        public Task<IEnumerable<EnrolledStudentView>> GetEnrolledStudentsByCourseIDAsync(int courseId);
        public Task<IEnumerable<MyEnrollment>> GetEnrollmentsByUserAsync(int userId);
        public Task<IEnumerable<UserPayment>> GetPaymentsByUserIDAsync(int userId);
        public Task<(IEnumerable<InstructorPayment> Payments, int TotalCount)> GetAllPaymentsForInstructorAsync(int page, int pageSize, string searchTerm);
        public Task<IEnumerable<InstructorEarnings>> GetInstructorEarningsAsync(int instructorId);
        public Task<bool> SendMessageAsync(ChatMessage message);
        public Task<IEnumerable<ChatMessage>> GetChatHistoryAsync(int user1, int user2);
        public Task<IEnumerable<ChatUser>> GetChatUsersAsync(int userId);
        public Task<bool> MarkMessagesAsReadAsync(int senderId, int receiverId);
        public Task<IEnumerable<ChatUser>> GetUsersByRoleAsync(string roleName);
        public Task<UnreadCount> GetUnreadMessageCountAsync(int userId);
        public Task<int> CreateGroupChatAsync(GroupChatRequest request);
        public Task<List<GroupMessage>> GetGroupChatMessagesAsync(int groupId);
        public Task SendGroupMessageAsync(GroupMessageRequest request);
        public Task MarkGroupMessagesAsReadAsync(int groupId, int userId);
        public Task<UnreadCount> GetGroupUnreadMessageCountAsync(int userId);
        public Task<(IEnumerable<UserWithRole> users, int totalCount)> GetAllUsersAsync(string? searchTerm, string? role, int page, int pageSize);
        public Task<bool> ToggleUserStatusAsync(int userId);
        public Task<bool> UpdateUserRoleAsync(UpdateUserRoleRequest request);
        public Task<IEnumerable<Roles>> GetAllRolesAsync();
        public Task<IEnumerable<Category>> GetAllCategoriesAsync();
        public Task<int> SaveCategoryAsync(CategoryModel model);
        public Task<IEnumerable<CourseDropdownModel>> GetAllCoursesBasicAsync();
        public Task<(List<CoursePaymentDetails> payments, CourseEarningsSummary summary)> GetPaymentsByCourseIDAsync(int courseId);
        public Task<bool> AddOrUpdateCourseReviewAsync(CourseReview review);
        public Task<IEnumerable<CourseReviewDisplay>> GetCourseReviewsByCourseIDAsync(int courseId);
        public Task<bool> AddSupportTicketAsync(SupportRequestDto dto);
        public Task<AdminDashboardData> GetAdminDashboardDataAsync();
        public Task<IEnumerable<PendingInstructor>> GetPendingInstructorsAsync();
        public Task<bool> ApproveInstructorAsync(int userId);
        public Task<StudentDashboard> GetStudentDashboardAsync(int userId);


    }
}
