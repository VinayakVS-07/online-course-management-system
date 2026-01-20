using System.Collections;
using System.Data;
using System.Reflection.Metadata;
using Dapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.UserSecrets;
using Microsoft.OpenApi.Any;
using OnlineCourseApi.Data;
using OnlineCourseApi.Models;

namespace OnlineCourseApi.Repository
{
    public class UsersRepository : IUsersRepository
    {
        private readonly AppDbContext _context;
        public UsersRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<Users> GetUserByIDAsync(int userId)
        {
            using var connection = _context.CreatesqlConnection();
            var sql = "SELECT * FROM Users WHERE UserID = @UserID AND IsActive = 1";
            return await connection.QueryFirstOrDefaultAsync<Users>(sql, new { UserID = userId });
        }

        public async Task<IEnumerable<StudentEntrolled>> GetStudentBYcourseAsync(int CourseID)
        {
            using (var context = _context.CreatesqlConnection())
            {
             
                    var result = await context.QueryAsync<StudentEntrolled>(
                        "GetStudentBYcourse",
                        new { CourseID = CourseID },
                        commandType: CommandType.StoredProcedure
                    );

                    return result;
            }
        }
        public async Task<IEnumerable<Instructor>> GetCoursesByInstructorAsync(int UserID)
        {
            using (var context = _context.CreatesqlConnection())
            {
                var result = await context.QueryAsync<Instructor>(
                    "GetCoursesByInstructor",
                    new { InstructorID = UserID},
                    commandType: CommandType.StoredProcedure
                    );
                return result;
            }
        }
        public async Task<IEnumerable<CourseCount>> CountEntrolledStudentsAsync()
        {
            using (var context = _context.CreatesqlConnection())
            {
                var result = await context.QueryAsync<CourseCount>(
                    "CountEntrolledStudents",
                    commandType: CommandType.StoredProcedure
                    ); return result;
            }
        }
        public async Task<IEnumerable<TotalEarning>> TotalEarningPerCourseAsync()
        {
            using ( var context = _context.CreatesqlConnection())
            {
                var result = await context.QueryAsync<TotalEarning>(
                    "TotalEarningPerCourse",
                    commandType: CommandType.StoredProcedure);
                return result;
            }
        }
        public async Task<IEnumerable<NotEntrolled>> GetCoursesNotEnrolledByUserAsync(int UserID)
        {
            using ( var context = _context.CreatesqlConnection() )
            {
                var result = await context.QueryAsync<NotEntrolled>(
                    "GetCoursesNotEnrolledByUser",
                    new { UserID = UserID},
                    commandType: CommandType.StoredProcedure);
                return result;
            }
        }
        public async Task<IEnumerable<CourseAssignment>> GetAssignmentsByCourseAsync(int CourseID)
        {
            using( var context = _context.CreatesqlConnection())
            {
                var result = await context.QueryAsync<CourseAssignment>(
                    "GetAssignmentsByCourse",
                    new { CourseID = CourseID },
                    commandType: CommandType.StoredProcedure);
                return result;
            }
        }
        public async Task<IEnumerable<NoAssignmentSubmissoin>> GetStudentNotSubmittedAssignmentAsync()
        {
            using (var context = _context.CreatesqlConnection())
            {
                var result = await context.QueryAsync<NoAssignmentSubmissoin>(
                    "GetStudentNotSubmittedAssignment",
                    commandType: CommandType.StoredProcedure);
                return result;
            }
        }
        public async Task<IEnumerable<Top5Courses>> GetTop5CoursesAsync()
        {
            using var context = _context.CreatesqlConnection();
            {
                var result = await context.QueryAsync<Top5Courses>(
                    "GetTop5Courses",
                    commandType: CommandType.StoredProcedure);
                return result;
            }
        }
       
        public async Task<bool> UpdateCourseDescriptionAsync(UpdateDescription upd)
        {
            using ( var context = _context.CreatesqlConnection())
            {
                var result = await context.ExecuteAsync(
                    "UpdateCourseDescription",
                    new
                    {
                        upd.CourseID,
                        upd.NewDescription,
                        upd.ModifiedBy
                    },
                    commandType: CommandType.StoredProcedure );
                return result >= 0;

            }
        }
        public async Task<IEnumerable<StudentProgress>> StudentProgressAsync()
        {
            using var context = _context.CreatesqlConnection();
            {
                var result = await context.QueryAsync<StudentProgress>
                    (
                    "SELECT * FROM StudentProgress"
                    );
                return result;
            }
        }
        public async Task<int> DeleteUnEnrolledStudentsAsync()
        {
            using (var context = _context.CreatesqlConnection())
            {
                var result = await context.ExecuteAsync(
                    "DeleteUnEnrolledStudents",
                    commandType: CommandType.StoredProcedure);
                return result;
            }
        }
        public async Task<Payments> AddPaymentWithDiscountAsync(Payments pay)
        {
            using (var context = _context.CreatesqlConnection())
            {
                var result = await context.QuerySingleAsync<Payments>(
                    "AddPaymentWithDiscount",
                    new
                    {
                        pay.StudentID,
                        pay.CourseID,
                        pay.Amount,
                        pay.PaymentDate,
                        pay.PaymentStatus
                    },
                    commandType: CommandType.StoredProcedure);
                return result;
            }
        }
        public async Task<IEnumerable<PaymentDetails>> PaymentDetailsAsync()
        {
            using var context = _context.CreatesqlConnection();
            {
                var result = await context.QueryAsync<PaymentDetails>
                    (
                    "SELECT * FROM PaymentDetails"
                    );
                return result;
            }
        }
        public async Task<IEnumerable<Top5Students>> GetTop5StudentsAsync()
        {
            using var context = _context.CreatesqlConnection();
            {
                var result = await context.QueryAsync<Top5Students>
                    (
                    "GetTop5Students",
                    commandType: CommandType.StoredProcedure
                    );
                return result;
            }
        }







        public async Task<Users?> AuthenticateUserAsync(string email)
        {
            using (var context = _context.CreatesqlConnection())
            {
                var result = await context.QuerySingleOrDefaultAsync<Users>(
                    "AuthenticateUser",
                    new { Email = email },
                    commandType: CommandType.StoredProcedure
                );

                return result;
            }
        }

        public async Task<bool> RegisterUserAsync(RegisterUser user)
        {
            using (var context = _context.CreatesqlConnection())
            {
                var result = await context.ExecuteAsync(
                    "AddUser",
                    new
                    {
                        user.FirstName,
                        user.LastName,
                        user.Password,
                        user.Email,
                        user.Phone,
                        user.RoleID,
                        user.CreatedBy
                    },
                    commandType: CommandType.StoredProcedure
                    );
                return result > 0;
            }
        }
        public async Task<bool> SaveEmailOtpAsync(string email, string otp)
        {
            using var connection = _context.CreatesqlConnection();

            var result = await connection.ExecuteAsync(
                "INSERT INTO EmailOtps (Email, OTP, Expiry) VALUES (@Email, @Otp, DATEADD(MINUTE, 10, GETDATE()))",
                new { Email = email, Otp = otp });

            return result > 0;
        }
        public async Task<EmailOtp> GetValidOtpAsync(string email, string otp)
        {
            using var connection = _context.CreatesqlConnection();

            return await connection.QueryFirstOrDefaultAsync<EmailOtp>(
                "SELECT TOP 1 * FROM EmailOtps WHERE Email = @Email AND OTP = @Otp AND IsUsed = 0 AND Expiry > GETDATE()",
                new { Email = email, Otp = otp });
        }

        public async Task MarkOtpAsUsedAsync(int otpId)
        {
            using var connection = _context.CreatesqlConnection();

            await connection.ExecuteAsync("UPDATE EmailOtps SET IsUsed = 1 WHERE OtpID = @OtpID", new { OtpID = otpId });
        }

        public async Task<(IEnumerable<Courses> Courses, int TotalCount)> GetCoursesWithFiltersAsync(string search, int page, int pageSize)
        {
            using var context = _context.CreatesqlConnection();
            {
                var result = await context.QueryMultipleAsync
                    (
                    "GetCoursesWithFilters",
                     new
                     {
                         Search = search,
                         Page = page,
                         PageSize = pageSize
                     },
                     commandType: CommandType.StoredProcedure
                    );
                var courses = await result.ReadAsync<Courses>();
                var total = await result.ReadFirstOrDefaultAsync<dynamic>();
                int totalCount = total?.TotalCount ?? 0;

                return (courses, totalCount);

            }
        }
        public async Task<bool> SaveCourseAsync(SaveCourse course)
        {
            using var context = _context.CreatesqlConnection();
            var result = await context.ExecuteAsync("SaveCourse",
                new
            {
                course.CourseID,
                course.Title,
                course.Description,
                course.CategoryID,
                course.UserID,
                course.Duration,
                course.Price,
                course.Status,
                course.StartDate,
                course.EndDate,
                course.ModifiedBy,
                course.CreatedBy
            },
            commandType: CommandType.StoredProcedure);

            return result > 0;
        }
        public async Task<SaveCourse> GetCourseByIdAsync(int courseId)
        {
            using var context = _context.CreatesqlConnection();

            var result = await context.QueryFirstOrDefaultAsync<SaveCourse>(
                "GetCourseById",
                new { CourseID = courseId },
                commandType: CommandType.StoredProcedure
            );

            return result;
        }
        public async Task<(IEnumerable<GetStudents> Students, int TotalCount)> GetStudentsAsync(GetStudents pag)
        {
            using var context = _context.CreatesqlConnection();

            var result = await context.QueryMultipleAsync(
                "GetStudents",
                new
                {
                    pag.Page,
                    pag.PageSize,
                    pag.SearchTerm
                },
                commandType: CommandType.StoredProcedure
            );

            var students = await result.ReadAsync<GetStudents>();
            var total = await result.ReadFirstOrDefaultAsync<dynamic>();
            int totalCount = total?.TotalCount ?? 0;

            return (students, totalCount);
        }
        public async Task<(IEnumerable<GetInstructor> Instructors, int TotalCount)> GetInstructorAsync(GetInstructor paged)
        {
            using var context = _context.CreatesqlConnection();

            var result = await context.QueryMultipleAsync(
                "GetInstructor",
                new
                {
                    paged.Page,
                    paged.PageSize,
                    paged.SearchTerm
                },
                commandType: CommandType.StoredProcedure
            );

            var instructors = await result.ReadAsync<GetInstructor>();
            var total = await result.ReadFirstOrDefaultAsync<dynamic>();
            int totalCount = total?.TotalCount ?? 0;

            return (instructors, totalCount);
        }

        public async Task<UserProfile> GetUserProfileAsync(int userId)
        {
            using var connection = _context.CreatesqlConnection();
            return await connection.QueryFirstOrDefaultAsync<UserProfile>(
                "GetUserProfile",
                new { UserID = userId },
                commandType: CommandType.StoredProcedure
            );
        }

        public async Task<bool> UpdateUserProfileAsync(UserProfile model)
        {
            using var connection = _context.CreatesqlConnection();
            var affected = await connection.ExecuteAsync(
                "UpdateUserProfile",
                new
                {
                    model.UserID,
                    model.FirstName,
                    model.LastName,
                    model.Phone
                },
                commandType: CommandType.StoredProcedure
            );
            return affected > 0;
        }
        public async Task<(IEnumerable<AssignmentView> Assignments, int TotalCount)> GetAssignmentsAsync(int? courseId, int page, int pageSize, string searchTerm = "")
        {
            using var connection = _context.CreatesqlConnection();

            var result = await connection.QueryMultipleAsync(
                "GetAssignments",
                new
                {
                    CourseID = courseId,
                    UserID = (int?)null,
                    Page = page,
                    PageSize = pageSize,
                    SearchTerm = searchTerm
                },
                commandType: CommandType.StoredProcedure
            );

            var assignments = await result.ReadAsync<AssignmentView>();
            var total = await result.ReadFirstOrDefaultAsync<dynamic>();
            int totalCount = total?.TotalCount ?? 0;

            return (assignments, totalCount);
        }
        public async Task ToggleAssignmentStatusAsync(int assignmentId, bool isActive)
        {
            using var connection = _context.CreatesqlConnection();
            await connection.ExecuteAsync(
                "ToggleAssignmentStatus",
                new { AssignmentID = assignmentId, IsActive = isActive },
                commandType: CommandType.StoredProcedure
            );
        }


        public async Task<IEnumerable<SubmissionView>> GetSubmissionsByAssignmentAsync(int assignmentId)
        {
            using var conn = _context.CreatesqlConnection();
            return await conn.QueryAsync<SubmissionView>(
                "GetSubmissionsByAssignment",
                new { AssignmentID = assignmentId },
                commandType: CommandType.StoredProcedure
            );
        }
        public async Task<bool> ChangePasswordAsync(int userId, string currentPassword, string newPassword)
        {
            using var connection = _context.CreatesqlConnection();

            var result = await connection.ExecuteAsync(
                "ChangeUserPassword",
                new { UserID = userId, CurrentPassword = currentPassword, NewPassword = newPassword },
                commandType: CommandType.StoredProcedure
            );

            return result > 0;
        }
        public async Task<bool> SubmitAssignmentAsync(SubmissionCreate submission)
        {
            using var connection = _context.CreatesqlConnection();

            var result = await connection.ExecuteAsync("SubmitAssignment", new
            {
                submission.UserID,
                submission.CourseID,
                submission.AssignmentID,
                submission.FileURL,
                submission.CreatedBy
            }, commandType: CommandType.StoredProcedure);

            return result > 0;
        }
        public async Task<bool> GradeSubmissionAsync(int submissionId, decimal grade, string feedback, string modifiedBy)
        {
            using var connection = _context.CreatesqlConnection();

            var affectedRows = await connection.ExecuteAsync(
                "GradeSubmission",
                new
                {
                    SubmissionID = submissionId,
                    Grade = grade,
                    Feedback = feedback,
                    ModifiedBy = modifiedBy
                },
                commandType: CommandType.StoredProcedure
            );

            return affectedRows > 0;
        }

        public async Task<IEnumerable<StudentSubmissionView>> GetStudentSubmissionsAsync(int userId)
        {
            using var connection = _context.CreatesqlConnection();

            return await connection.QueryAsync<StudentSubmissionView>(
                "GetStudentSubmissions",
                new { UserID = userId },
                commandType: CommandType.StoredProcedure
            );
        }
        public async Task<bool> SaveAssignmentAsync(SaveAssignment model)
        {
            using var connection = _context.CreatesqlConnection();

            var affectedRows = await connection.ExecuteAsync(
                "SaveAssignment",
                new
                {
                    model.AssignmentID,
                    model.CourseID,
                    model.Title,
                    model.Description,
                    model.DueDate,
                    model.FileURL,
                    model.CreatedBy,
                    model.ModifiedBy
                },
                commandType: CommandType.StoredProcedure
            );

            return affectedRows > 0;
        }
        public async Task<SaveAssignment?> GetAssignmentByIdAsync(int id)
        {
            using var connection = _context.CreatesqlConnection();
            return await connection.QueryFirstOrDefaultAsync<SaveAssignment>(
                "SELECT * FROM Assignments WHERE AssignmentID = @id",
                new { id }
            );
        }
        public async Task<bool> EnrollStudentAsync(int userId, int courseId, string createdBy)
        {
            using (var context = _context.CreatesqlConnection())
            {
                var result = await context.ExecuteAsync(
                    "EnrollStudent",
                    new
                    {
                        UserID = userId,
                        CourseID = courseId,
                        CreatedBy = createdBy
                    },
                    commandType: CommandType.StoredProcedure
                    );
                return result > 0;
            }
        }
        public async Task<bool> MakePaymentAndEnrollAsync(PaymentModel model)
        {
            using var connection = _context.CreatesqlConnection();

            var rows = await connection.ExecuteAsync("MakePaymentAndEnroll",
                new
            {
                model.UserID,
                model.CourseID,
                model.Amount,
                model.PaymentStatus,
                model.CreatedBy
            }, commandType: CommandType.StoredProcedure);

            return rows > 0;
        }
        public async Task<EnrollmentEmailDto> GetEnrollmentConfirmationDetailsAsync(int userId, int courseId)
        {
            using var connection = _context.CreatesqlConnection();
            return await connection.QueryFirstOrDefaultAsync<EnrollmentEmailDto>(
                "GetEnrollmentConfirmationDetails",
                new { UserID = userId, CourseID = courseId },
                commandType: CommandType.StoredProcedure
            );
        }
        public async Task<IEnumerable<EnrolledStudentView>> GetEnrolledStudentsByCourseIDAsync(int courseId)
        {
            using var connection = _context.CreatesqlConnection();
            return await connection.QueryAsync<EnrolledStudentView>(
                "GetEnrolledStudentsByCourseID",
                new { CourseID = courseId },
                commandType: CommandType.StoredProcedure);
        }
        public async Task<IEnumerable<MyEnrollment>> GetEnrollmentsByUserAsync(int userId)
        {
            using var connection = _context.CreatesqlConnection();

            var result = await connection.QueryAsync<MyEnrollment>(
                "GetEnrollmentsByUserID",
                new { UserID = userId },
                commandType: CommandType.StoredProcedure
            );

            return result;
        }
        public async Task<IEnumerable<UserPayment>> GetPaymentsByUserIDAsync(int userId)
        {
            using var connection = _context.CreatesqlConnection();
            return await connection.QueryAsync<UserPayment>(
                "GetPaymentsByUserID",
                new { UserID = userId },
                commandType: CommandType.StoredProcedure
            );
        }
        public async Task<(IEnumerable<InstructorPayment> Payments, int TotalCount)> GetAllPaymentsForInstructorAsync(int page, int pageSize, string searchTerm)
        {
            using var connection = _context.CreatesqlConnection();

            var result = await connection.QueryMultipleAsync(
                "GetAllPaymentsForInstructor",
                new
                {
                    Page = page,
                    PageSize = pageSize,
                    SearchTerm = searchTerm
                },
                commandType: CommandType.StoredProcedure
            );

            var payments = await result.ReadAsync<InstructorPayment>();
            var total = await result.ReadFirstOrDefaultAsync<dynamic>();
            int totalCount = total?.TotalCount ?? 0;

            return (payments, totalCount);
        }

        public async Task<IEnumerable<InstructorEarnings>> GetInstructorEarningsAsync(int instructorId)
        {
            using var connection = _context.CreatesqlConnection();
            var result = await connection.QueryAsync<InstructorEarnings>(
                "GetInstructorEarnings",
                new { InstructorID = instructorId },
                commandType: CommandType.StoredProcedure
            );
            return result;
        }
        public async Task<bool> SendMessageAsync(ChatMessage message)
        {
            using var connection = _context.CreatesqlConnection();

            var result = await connection.ExecuteAsync(
                "SendChatMessage",
                new { message.SenderID, message.ReceiverID, message.Message },
                commandType: CommandType.StoredProcedure
            );

            return result > 0;
        }
        public async Task<IEnumerable<ChatMessage>> GetChatHistoryAsync(int user1, int user2)
        {
            using var connection = _context.CreatesqlConnection();
            var result = await connection.QueryAsync<ChatMessage>(
                "GetChatHistory",
                new { User1 = user1, User2 = user2 },
                commandType: CommandType.StoredProcedure
            );
            return result;
        }
        public async Task<IEnumerable<ChatUser>> GetChatUsersAsync(int userId)
        {
            using var connection = _context.CreatesqlConnection();

            return await connection.QueryAsync<ChatUser>(
                "GetChatUsers",
                new { UserID = userId },
                commandType: CommandType.StoredProcedure
            );
        }
        public async Task<bool> MarkMessagesAsReadAsync(int senderId, int receiverId)
        {
            using var connection = _context.CreatesqlConnection();
            var result = await connection.ExecuteAsync(
                "MarkMessagesAsRead",
                new { SenderID = senderId, ReceiverID = receiverId },
                commandType: CommandType.StoredProcedure
            );

            return result > 0;
        }
        public async Task<IEnumerable<ChatUser>> GetUsersByRoleAsync(string roleName)
        {
            using var connection = _context.CreatesqlConnection();

            var result = await connection.QueryAsync<ChatUser>(
                "GetUsersByRole",
                new { RoleName = roleName },
                commandType: CommandType.StoredProcedure
            );

            return result;
        }
        public async Task<UnreadCount> GetUnreadMessageCountAsync(int userId)
        {
            using var connection = _context.CreatesqlConnection();

            var result = await connection.QueryFirstOrDefaultAsync<UnreadCount>(
                "GetUnreadMessageCount",
                new { UserID = userId },
                commandType: CommandType.StoredProcedure
            );

            return result ?? new UnreadCount { Count = 0 };
        }

        public async Task<int> CreateGroupChatAsync(GroupChatRequest request)
        {
            var participantTable = new DataTable();
            participantTable.Columns.Add("UserID", typeof(int));

            foreach (var id in request.ParticipantIDs)
            {
                participantTable.Rows.Add(id);
            }

            var parameters = new DynamicParameters();
            parameters.Add("@GroupName", request.GroupName);
            parameters.Add("@CreatedBy", request.CreatedBy);
            parameters.Add("@ParticipantIDs", participantTable.AsTableValuedParameter("dbo.IntList"));

            using var connection = _context.CreatesqlConnection();
            return await connection.ExecuteScalarAsync<int>(
                "CreateGroupChat",
                parameters,
                commandType: CommandType.StoredProcedure
            );
        }
        public async Task<List<GroupMessage>> GetGroupChatMessagesAsync(int groupId)
        {
            using var connection = _context.CreatesqlConnection();

            var result = await connection.QueryAsync<GroupMessage>(
                "GetGroupChatMessages",
                new { GroupID = groupId },
                commandType: CommandType.StoredProcedure
            );

            return result.ToList();
        }

        public async Task SendGroupMessageAsync(GroupMessageRequest request)
        {
            using var connection = _context.CreatesqlConnection();

            await connection.ExecuteAsync(
                "SendGroupMessage",
                new { request.GroupID, request.SenderID, request.Message },
                commandType: CommandType.StoredProcedure
            );
        }
        public async Task MarkGroupMessagesAsReadAsync(int groupId, int userId)
        {
            using var connection = _context.CreatesqlConnection();

            await connection.ExecuteAsync(
                "MarkGroupMessagesAsRead",
                new { GroupID = groupId, UserID = userId },
                commandType: CommandType.StoredProcedure
                );
        }
        public async Task<UnreadCount> GetGroupUnreadMessageCountAsync(int userId)
        {
            using var connection = _context.CreatesqlConnection();

            var result = await connection.QueryFirstOrDefaultAsync<UnreadCount>(
                "GetGroupUnreadMessageCount",
                new { UserID = userId },
                commandType: CommandType.StoredProcedure
            );

            return result ?? new UnreadCount { Count = 0 };
        }

        public async Task<(IEnumerable<UserWithRole> users, int totalCount)> GetAllUsersAsync(string? searchTerm, string? role, int page, int pageSize)
        {
            using (var connection = _context.CreatesqlConnection())
            {
                using (var multi = await connection.QueryMultipleAsync(
                    "GetUsersWithFilter",
                    new { SearchTerm = searchTerm, RoleName = role, Page = page, PageSize = pageSize },
                    commandType: CommandType.StoredProcedure))
                {
                    var total = await multi.ReadSingleAsync<int>();
                    var users = await multi.ReadAsync<UserWithRole>();
                    return (users, total);
                }
            }
        }
        public async Task<bool> ToggleUserStatusAsync(int userId)
        {
            using var connection = _context.CreatesqlConnection();
            var affectedRows = await connection.ExecuteAsync(
                "ToggleUserStatus",
                new { UserID = userId },
                commandType: CommandType.StoredProcedure
                );
            return affectedRows > 0;
        }
        public async Task<bool> UpdateUserRoleAsync(UpdateUserRoleRequest request)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@UserID", request.UserID);
            parameters.Add("@NewRoleID", request.NewRoleID);
            parameters.Add("@ModifiedBy", request.ModifiedBy);

            using var connection = _context.CreatesqlConnection();
            var rowsAffected = await connection.ExecuteAsync(
                "UpdateUserRole",
                parameters,
                commandType: CommandType.StoredProcedure
                );
            return rowsAffected > 0;
        }
        public async Task<IEnumerable<Roles>> GetAllRolesAsync()
        {
            using var connection = _context.CreatesqlConnection();
            return await connection.QueryAsync<Roles>("GetAllRoles", commandType: CommandType.StoredProcedure);
        }

        public async Task<IEnumerable<Category>> GetAllCategoriesAsync()
        {
            using var connection = _context.CreatesqlConnection();
            var categories = await connection.QueryAsync<Category>(
                "SELECT CategoryID, Name, Description FROM Category"
            );
            return categories;
        }

        public async Task<int> SaveCategoryAsync(CategoryModel model)
        {
            using var connection = _context.CreatesqlConnection();

            var parameters = new DynamicParameters();
            parameters.Add("@Name", model.Name);
            parameters.Add("@Description", model.Description);
            parameters.Add("@CategoryID", dbType: DbType.Int32, direction: ParameterDirection.Output);

            await connection.ExecuteAsync(
                "InsertCategoryIfNotExists",
                parameters,
                commandType: CommandType.StoredProcedure
            );

            return parameters.Get<int>("@CategoryID");
        }
        public async Task<IEnumerable<CourseDropdownModel>> GetAllCoursesBasicAsync()
        {
            using var connection = _context.CreatesqlConnection();

            var result = await connection.QueryAsync<CourseDropdownModel>(
                "GetAllCoursesBasic",
                commandType: CommandType.StoredProcedure
            );

            return result;
        }
        public async Task<(List<CoursePaymentDetails> payments, CourseEarningsSummary summary)> GetPaymentsByCourseIDAsync(int courseId)
        {
            using var connection = _context.CreatesqlConnection();
            using var multi = await connection.QueryMultipleAsync(
                "GetPaymentsByCourseID",
                new { CourseID = courseId },
                commandType: CommandType.StoredProcedure);

            var payments = (await multi.ReadAsync<CoursePaymentDetails>()).ToList();
            var summary = await multi.ReadFirstOrDefaultAsync<CourseEarningsSummary>();

            return (payments, summary ?? new CourseEarningsSummary { CourseID = courseId, TotalEarnings = 0 });
        }

        public async Task<bool> AddOrUpdateCourseReviewAsync(CourseReview review)
        {
            using var connection = _context.CreatesqlConnection();
            var rows = await connection.ExecuteAsync(
                "AddOrUpdateCourseReview",
                new
                {
                    review.UserID,
                    review.CourseID,
                    review.Rating,
                    review.ReviewText,
                    review.CreatedBy
                },
                commandType: CommandType.StoredProcedure);
            return rows > 0;
        }

        public async Task<IEnumerable<CourseReviewDisplay>> GetCourseReviewsByCourseIDAsync(int courseId)
        {
            using var connection = _context.CreatesqlConnection();
            var result = await connection.QueryAsync<CourseReviewDisplay>(
                "GetCourseReviewsByCourseID",
                new { CourseID = courseId },
                commandType: CommandType.StoredProcedure);
            return result;
        }

        public async Task<bool> AddSupportTicketAsync(SupportRequestDto dto)
        {
            using var connection = _context.CreatesqlConnection();
            var result = await connection.ExecuteAsync(
                "AddSupportTicket",
                new { dto.UserID, dto.Subject, dto.Message },
                commandType: CommandType.StoredProcedure
            );

            return result > 0;
        }
        public async Task<AdminDashboardData> GetAdminDashboardDataAsync()
        {
            using var connection = _context.CreatesqlConnection();

            using var multi = await connection.QueryMultipleAsync(
                "GetAdminDashboardData",
                commandType: CommandType.StoredProcedure
            );

            var kpis = new DashboardKPI
            {
                TotalStudents = multi.ReadFirst<int>(),
                TotalCourses = multi.ReadFirst<int>(),
                TotalInstructors = multi.ReadFirst<int>(),
                TotalAssignments = multi.ReadFirst<int>(),
                TotalPayments = multi.ReadFirst<decimal>()
            };

            var enrollments = multi.Read<DashboardEnrollment>().ToList();
            var payments = multi.Read<DashboardPayment>().ToList();
            var assignments = multi.Read<DashboardAssignment>().ToList();

            return new AdminDashboardData
            {
                KPIs = kpis,
                LatestEnrollments = enrollments,
                LatestPayments = payments,
                LatestAssignments = assignments
            };
        }
        public async Task<IEnumerable<PendingInstructor>> GetPendingInstructorsAsync()
        {
            using var connection = _context.CreatesqlConnection();
            var result = await connection.QueryAsync<PendingInstructor>(
                "GetPendingInstructors",
                commandType: CommandType.StoredProcedure
            );
            return result;
        }

        public async Task<bool> ApproveInstructorAsync(int userId)
        {
            using var connection = _context.CreatesqlConnection();
            var rows = await connection.ExecuteAsync(
                "ApproveInstructor",
                new { UserID = userId },
                commandType: CommandType.StoredProcedure
            );
            return rows > 0;
        }
        public async Task<StudentDashboard> GetStudentDashboardAsync(int userId)
        {
            using var connection = _context.CreatesqlConnection();
            using var multi = await connection.QueryMultipleAsync(
                "GetStudentDashboard",
                new { UserID = userId },
                commandType: CommandType.StoredProcedure);

            var enrollments = (await multi.ReadAsync<MyEnrollment>()).ToList();
            var submissions = (await multi.ReadAsync<StudentSubmissionView>()).ToList();

            return new StudentDashboard
            {
                EnrolledCourses = enrollments,
                Submissions = submissions
            };
        }
    }
}

