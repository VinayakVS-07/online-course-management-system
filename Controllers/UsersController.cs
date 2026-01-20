using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using OnlineCourseApi.Data;
using System.Threading.Tasks;
using OnlineCourseApi.Models;
using OnlineCourseApi.Repository;
using OnlineCourseApi.Service;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace OnlineCourseApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {

        private readonly IUsersRepository _UsersRepository;
        private readonly JwtTokenService _jwtTokenService;
        private readonly EmailService _emailService;
        private readonly IAIService _aiService;


        public UsersController(IUsersRepository UsersRepository, JwtTokenService jwtTokenService, EmailService emailService, IAIService aiService)
        {
            _UsersRepository = UsersRepository;
            _jwtTokenService = jwtTokenService;
            _emailService = emailService;
            _aiService = aiService;
        }


        [HttpGet("all")]
        public IActionResult GetAllCourses()
        {
            return Ok(new { message = "Authorized access to courses" });
        }

        [AllowAnonymous] 
        [HttpGet("public-courses")]
        public IActionResult GetPublicCourses()
        {
            return Ok(new { message = "Anyone can access this" });
        }

        /// <summary>
        /// Gets a user by ID.
        /// </summary>
        /// <param name="ID">The ID of the user to retrieve.</param>
        /// <returns>Returns the user object or 404 if not found.</returns>
        [HttpGet]
        [ProducesResponseType(typeof(Users), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetUserByID(int ID)
        {
            try
            {
                var user = await _UsersRepository.GetUserByIDAsync(ID);

                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        /// <summary>
        /// Gets a course by ID.
        /// </summary>
        /// <param name="CourseID">The ID of the course to retrieve.</param>
        /// <returns>Returns the users object or 404 if not found.</returns>
        [HttpGet("courseid")]
        [ProducesResponseType(typeof(StudentEntrolled), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetStudentBYcourse(int CourseID)
        {
            try
            {
                var users = await _UsersRepository.GetStudentBYcourseAsync(CourseID);
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        /// <summary>
        /// Gets a user by ID.
        /// </summary>
        /// <param name="UserID">The ID of the course to retrieve.</param>
        /// <returns>Returns the instructor object or 404 if not found.</returns>
        [HttpGet("byinstructor/{UserID}")]
        [ProducesResponseType(typeof(Instructor), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetCoursesByInstructor(int UserID)
        {
            try
            {
                var instructor = await _UsersRepository.GetCoursesByInstructorAsync(UserID);
                return Ok(instructor);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

        }
        /// <summary>
        /// Get entrolled students count
        /// </summary>
        /// <returns>Returns the count object or 404 if not found.</returns>
        [HttpGet("Studentscount")]
        [ProducesResponseType(typeof(CourseCount), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]

        public async Task<IActionResult> CountEntrolledStudents()
        {
            try
            {
                var count = await _UsersRepository.CountEntrolledStudentsAsync();
                return Ok(count);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");

            }
        }
        /// <summary>
        /// Get total earning per course
        /// </summary>
        /// <returns>Returns the earning object or 404 if not found.</returns>
        [HttpGet("earnings")]
        [ProducesResponseType(typeof(TotalEarning), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> TotalEarningPerCourse()
        {
            try
            {
                var earning = await _UsersRepository.TotalEarningPerCourseAsync();
                return Ok(earning);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");

            }
        }
        /// <summary>
        /// Get courses not entrolled by user
        /// </summary>
        /// <param name="UserID">ID of user to retrieve.</param>
        /// <returns>Returns the user object or 404 if not found.</returns>
        [HttpGet("notentrolled")]
        [ProducesResponseType(typeof(NotEntrolled), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetCoursesNotEnrolledByUser(int UserID)
        {
            try
            {
                var user = await _UsersRepository.GetCoursesNotEnrolledByUserAsync(UserID);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");

            }
        }
        /// <summary>
        /// Get a assignment by ID 
        /// </summary>
        /// <param name="CourseID">ID of the course to retrieve.</param>
        /// <returns>Returns the course object or 404 if not found.</returns>
        [HttpGet("noassignment")]
        [ProducesResponseType(typeof(CourseAssignment), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAssignmentsByCourse(int CourseID)
        {
            try
            {
                var course = await _UsersRepository.GetAssignmentsByCourseAsync(CourseID);
                return Ok(course);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");

            }
        }
        /// <summary>
        /// Get students not submitted assignment
        /// </summary>
        /// <returns>Returns the assignment object or 404 if not found.</returns>
        [HttpGet("courseassignment")]
        [ProducesResponseType(typeof(NoAssignmentSubmissoin), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetStudentNotSubmittedAssignment()
        {
            try
            {
                var assignment = await _UsersRepository.GetStudentNotSubmittedAssignmentAsync();
                return Ok(assignment);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");

            }
        }
        /// <summary>
        /// Get top 5 courses
        /// </summary>
        /// <returns>Returns the courses object or 404 if not found.</returns>
        [HttpGet("top5courses")]
        [ProducesResponseType(typeof(Top5Courses), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetTop5Courses()
        {
            try
            {
                var courses = await _UsersRepository.GetTop5CoursesAsync();
                return Ok(courses);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Updates the course description.
        /// </summary>
        /// <param name="des">Object with course ID, new description, and modified by.</param>
        /// <returns>200 if updated, 400 if not found or inactive, 500 if failed.</returns>
        [HttpPut("Update")]
        [ProducesResponseType(typeof(UpdateDescription), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateCourseDescription([FromBody] UpdateDescription des)
        {
            try
            {
                var success = await _UsersRepository.UpdateCourseDescriptionAsync(des);
                if (success)
                    return Ok("Description Updated Successfully.");
                else return BadRequest("Failed To Update.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        /// <summary>
        /// Get progress of students
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpGet("progress")]
        [ProducesResponseType(typeof(StudentProgress), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> StudentProgress()
        {
            try
            {
                var result = await _UsersRepository.StudentProgressAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error:{ex.Message}");
            }
        }
        /// <summary>
        /// Deletes unentrolled student.
        /// </summary>
        /// <returns>200 if deleted, 404 if not found, 500 if error.</returns>
        [HttpDelete("delete_unenrolled")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteUnEnrolledStudents()
        {
            try
            {
                var dltcount = await _UsersRepository.DeleteUnEnrolledStudentsAsync();
                if (dltcount == 0)
                    return Ok("No Students Were Deleted.");
                else
                    return Ok($"{dltcount} Deleted Successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error:{ex.Message}");
            }

        }
        /// <summary>
        /// Add payment with discount
        /// </summary>
        /// <param name="pay">object with StudentID, CourseID, Amount, Payment Date, Payment Status.</param>
        /// <returns>200 if discount added,  404 if not found, 500 if error.</returns>
        [HttpPost("add_discount")]
        [ProducesResponseType(typeof(Payments), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AddPaymentWithDiscount([FromBody] Payments pay)
        {
            try
            {
                var result = await _UsersRepository.AddPaymentWithDiscountAsync(pay);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
        /// <summary>
        /// Get payment details
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpGet("payment_details")]
        [ProducesResponseType(typeof(PaymentDetails), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> PaymentDetails()
        {
            try
            {
                var result = await _UsersRepository.PaymentDetailsAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error:{ex.Message}");
            }
        }
        /// <summary>
        /// Get top 5 students
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpGet("top5students")]
        [ProducesResponseType(typeof(Top5Students), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetTop5Students()
        {
            try
            {
                var result = await _UsersRepository.GetTop5StudentsAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error :{ex.Message}");
            }
        }









        /// <summary>
        /// Get user email and password
        /// </summary>
        /// <param name="log"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost("login")]
        [ProducesResponseType(typeof(Login), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Login([FromBody] Login log)
        {
            try
            {
                var user = await _UsersRepository.AuthenticateUserAsync(log.Email);

                if (user == null)
                {
                    return Ok(new { success = false, message = "User not registered." });
                }

                // Password check (plain text for now; hashing recommended)
                if (user.Password != log.Password)
                {
                    return Ok(new { success = false, message = "Invalid password." });
                }

                // Active check
                if (user.IsActive == 0)
                {
                    return Ok(new { success = false, message = "Your account is pending admin approval." });
                }

                // Success → generate token
                var token = _jwtTokenService.GenerateToken(user);

                return Ok(new
                {
                    success = true,
                    message = "Login successful",
                    token = token,
                    userID = user.UserID,
                    firstName = user.FirstName,
                    lastName = user.LastName,
                    email = user.Email,
                    phone = user.Phone,
                    role = user.RoleName
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = $"Error: {ex.Message}" });
            }
        }

        /// <summary>
        /// Register a user
        /// </summary>
        /// <param name="reg"></param>
        /// <returns>>200 if registered, 400 if not , 500 if failed.</returns>
        [AllowAnonymous]
        [HttpPost("Register")]
        [ProducesResponseType(typeof(RegisterUser), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterUser reg)
        {
            try
            {
                var success = await _UsersRepository.RegisterUserAsync(reg);
                if (success)
                    return Ok(new { success = true, message = "Successfully Registered" });
                else
                    return BadRequest(new { success = false, message = "Registration Failed" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = $"Error: {ex.Message}" });
            }
        }
        [HttpPost("send-otp")]
        [AllowAnonymous]
        public async Task<IActionResult> SendOtp([FromBody] EmailOtpRequest request)
        {
            var otp = new Random().Next(100000, 999999).ToString();

            var saved = await _UsersRepository.SaveEmailOtpAsync(request.Email, otp);
            if (!saved)
                return BadRequest(new { success = false, message = "Failed to store OTP." });

            await _emailService.SendOtpEmailAsync(request.Email, otp);
            return Ok(new { success = true, message = "OTP sent to your email." });
        }
        [HttpPost("register-verify")]
        [AllowAnonymous]
        public async Task<IActionResult> RegisterWithOtp([FromBody] OtpRegisterRequest model)
        {
            var otpRecord = await _UsersRepository.GetValidOtpAsync(model.Email, model.OTP);

            if (otpRecord == null)
                return BadRequest(new { success = false, message = "Invalid or expired OTP." });

            var registered = await _UsersRepository.RegisterUserAsync(model);
            if (!registered)
                return BadRequest(new { success = false, message = "Registration failed." });

            await _UsersRepository.MarkOtpAsUsedAsync(otpRecord.OtpID);
            await _emailService.SendRegistrationSuccessEmailAsync(model.Email, model.FirstName);

            return Ok(new { success = true, message = "Successfully Registered.Please Login!" });
        }

        /// <summary>
        /// Get course details
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpPost("courses")]
        [ProducesResponseType(typeof(Courses), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetCoursesWithFilters([FromBody] SearchRequest request)
        {
            try
            {
                var (courses, totalCount) = await _UsersRepository.GetCoursesWithFiltersAsync(request.Search, request.Page, request.PageSize);
                return Ok(new { courses, totalCount });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error:{ex.Message}");
            }
        }
        /// <summary>
        /// save a course
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>

        [HttpPost("save-course")]
        [ProducesResponseType(typeof(SaveCourse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> SaveCourse([FromBody] SaveCourse course)
        {
            try
            {
                var result = await _UsersRepository.SaveCourseAsync(course);
                if (result)
                {
                    return Ok(new
                    {
                        success = true,
                        message = "Course saved successfully."
                    });
                }
                else
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "Failed to save course."
                    });
                }

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
        /// <summary>
        /// Get a course by ID
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpGet("course/{id}")]
        [ProducesResponseType(typeof(SaveCourse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetCourseById(int id)
        {
            try
            {
                var course = await _UsersRepository.GetCourseByIdAsync(id);
                if (course == null)
                    return NotFound("Course not found.");

                return Ok(course);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error during SaveCourse: " + ex.Message);
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        /// <summary>
        /// Get students details
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpPost("students")]
        [ProducesResponseType(typeof(GetStudents), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetStudents([FromBody] GetStudents pag)
        {
            try
            {
                var (students, totalCount) = await _UsersRepository.GetStudentsAsync(pag);
                return Ok(new { students, totalCount });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error:{ex.Message}");
            }
        }
        /// <summary>
        /// Get instructors details
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpPost("instructors")]
        [ProducesResponseType(typeof(GetInstructor), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetInstructor([FromBody] GetInstructor pag)
        {
            try
            {
                var (instructors, totalCount) = await _UsersRepository.GetInstructorAsync(pag);
                return Ok(new { instructors, totalCount });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error:{ex.Message}");
            }
        }
        /// <summary>
        /// Get profile by ID
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpGet("{userId}")]
        [ProducesResponseType(typeof(UserProfile), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetProfile(int userId)
        {
            try
            {
                var profile = await _UsersRepository.GetUserProfileAsync(userId);
                if (profile == null)
                    return NotFound();

                return Ok(profile);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error:{ex.Message}");
            }
        }
        /// <summary>
        /// Edit profile by ID
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpPut("EditProfile")]
        [ProducesResponseType(typeof(UserProfile), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateProfile([FromBody] UserProfile model)
        {
            var updated = await _UsersRepository.UpdateUserProfileAsync(model);

            if (!updated)
                return BadRequest(new { success = false, message = "Update failed" });

            return Ok(new { success = true, message = "Profile updated successfully" });
        }
        /// <summary>
        /// Get assignment by ID
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpPost("assignments")]
        [ProducesResponseType(typeof(IEnumerable<AssignmentView>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAssignments([FromBody] AssignmentFilter filter)
        {
            try
            {
                var (assignments, totalCount) = await _UsersRepository.GetAssignmentsAsync(filter.CourseID, filter.Page, filter.PageSize, filter.SearchTerm);

                return Ok(new
                {
                    assignments,
                    totalCount
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
        [HttpPut("assignments/{id}/status")]
        public async Task<IActionResult> ToggleAssignmentStatus(int id, [FromBody] AssignmentStatusUpdate input)
        {
            try
            {
                await _UsersRepository.ToggleAssignmentStatusAsync(id, input.IsActive);
                return Ok(new { success = true });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }


        // Instructor: list submissions for an assignment
        [HttpGet("by-assignment/{assignmentId}")]
        public async Task<IActionResult> GetByAssignment(int assignmentId)
          => Ok(await _UsersRepository.GetSubmissionsByAssignmentAsync(assignmentId));

        /// <summary>
        /// change password
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
        {
            try
            {
                var success = await _UsersRepository.ChangePasswordAsync(dto.UserID, dto.CurrentPassword, dto.NewPassword);
                if (success)
                {
                    return Ok(new { success = true, message = "Password changed successfully" });
                }
                return BadRequest(new { success = false, message = "Failed to change password" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
        /// <summary>
        /// To submit an assignment
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpPost("submit-assignment")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> SubmitAssignment([FromBody] SubmissionCreate submission)
        {
            try
            {
                var result = await _UsersRepository.SubmitAssignmentAsync(submission);
                if (result)
                {
                    return Ok(new { success = true, message = "Assignment submitted successfully." });
                }

                return BadRequest(new { success = false, message = "Submission failed." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
        /// <summary>
        /// To submit grade
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpPost("grade")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GradeSubmission([FromBody] GradeSubmission model)
        {
            var success = await _UsersRepository.GradeSubmissionAsync(
                model.SubmissionID,
                model.Grade,
                model.Feedback,
                model.ModifiedBy
            );

            if (success)
                return Ok(new { message = "Submission graded successfully" });

            return BadRequest("Failed to grade submission");
        }
        /// <summary>
        /// Get student submission
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpGet("student-submissions/{userId}")]
        [ProducesResponseType(typeof(IEnumerable<StudentSubmissionView>), 200)]
        public async Task<IActionResult> GetStudentSubmissions(int userId)
        {
            try
            {
                var result = await _UsersRepository.GetStudentSubmissionsAsync(userId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }
        /// <summary>
        /// edit and Save Assignment
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>

        [HttpPost("save-assignment")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> SaveAssignment([FromBody] SaveAssignment model)
        {
            try
            {
                var success = await _UsersRepository.SaveAssignmentAsync(model);

                if (success)
                    return Ok(new { success = true, message = "Assignment saved successfully" });
                else
                    return BadRequest(new { success = false, message = "Failed to save assignment" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
        /// <summary>
        /// Get assignment by Id
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>

        [HttpGet("assignment/{id}")]
        public async Task<IActionResult> GetAssignmentById(int id)
        {
            try
            {
                var assignment = await _UsersRepository.GetAssignmentByIdAsync(id);
                return Ok(assignment);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
        /// <summary>
        /// Entrollment of a student
        /// </summary>
        /// <param name="std">object with UserID , CourseID and Created by</param>
        /// <returns>>200 if entrolled, 400 if not , 500 if failed.</returns>
        [HttpPost("enroll")]
        [ProducesResponseType(typeof(Enrollment), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> EnrollStudent([FromBody] Enrollment std)
        {
            try
            {
                var success = await _UsersRepository.EnrollStudentAsync(std.UserID, std.CourseID, std.CreatedBy);
                if (success)
                {
                    return Ok(new { success = true, message = "Student enrolled successfully" });
                }
                return BadRequest(new { success = false, message = "Enrollment failed" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error:{ex.Message}");
            }
        }
        /// <summary>
        /// Make payment
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpPost("make-payment")]
        [ProducesResponseType(typeof(PaymentModel), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> MakePayment([FromBody] PaymentModel model)
        {
            try
            {
                var success = await _UsersRepository.MakePaymentAndEnrollAsync(model);
                if (success)
                    return Ok(new { success = true, message = "Payment and enrollment successful" });

                return BadRequest(new { success = false, message = "Enrollment failed" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
        [AllowAnonymous]
        [HttpPost("make-payment-enroll")]
        public async Task<IActionResult> MakePaymentAndEnroll([FromBody] PaymentModel model)
        {
            // 1. Make payment + enroll
            var success = await _UsersRepository.MakePaymentAndEnrollAsync(model);

            if (!success)
                return BadRequest("Payment or enrollment failed.");

            // 2. Get email details
            var emailDetails = await _UsersRepository.GetEnrollmentConfirmationDetailsAsync(model.UserID, model.CourseID);

            if (emailDetails == null)
                return NotFound("Enrollment details not found for email.");

            // 3. Send email
            try
            {
                await _emailService.SendEnrollmentConfirmationEmailAsync(emailDetails);

                return Ok(new { success = true, message = "Enrollment and confirmation email sent successfully." });

            }
            catch (Exception ex)
            {
                return BadRequest(new { success = false, message = "Email sending failed." });

            }

        }
        /// <summary>
        /// Get enrollment by courseId
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpGet("course/{courseId}/enrollments")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetEnrolledStudentsByCourseID(int courseId)
        {
            try
            {
                var result = await _UsersRepository.GetEnrolledStudentsByCourseIDAsync(courseId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
        /// <summary>
        /// Get enrollment by userId
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpGet("enrollments/{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetUserEnrollments(int userId)
        {
            var result = await _UsersRepository.GetEnrollmentsByUserAsync(userId);
            return Ok(result);
        }
        /// <summary>
        /// Get payment details by userId
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpPost("student-payments/{userId}")]
        public async Task<IActionResult> GetStudentPayments(int userId)
        {
            try
            {
                var payments = await _UsersRepository.GetPaymentsByUserIDAsync(userId);
                return Ok(payments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
        /// <summary>
        /// Get all payment details
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpPost("all-payments")]
        [ProducesResponseType(typeof(InstructorPayment), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAllPayments([FromBody] PaymentFilter filter)
        {
            try
            {
                var (payments, totalCount) = await _UsersRepository.GetAllPaymentsForInstructorAsync(
                filter.Page,
                filter.PageSize,
                filter.SearchTerm ?? ""
              );
                return Ok(new { payments, totalCount });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
        /// <summary>
        /// Get instructor earning
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        /// 
        [HttpGet("instructor-earnings/{instructorId}")]
        [ProducesResponseType(typeof(InstructorEarnings), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetEarningsByInstructor(int instructorId)
        {
            try
            {
                var earnings = await _UsersRepository.GetInstructorEarningsAsync(instructorId);
                return Ok(earnings);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
        /// <summary>
        /// Add chats
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpPost("send-chat")]
        [ProducesResponseType(typeof(ChatMessage), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> SendMessage([FromBody] ChatMessage message)
        {
            try
            {
                var success = await _UsersRepository.SendMessageAsync(message);
                if (success)
                    return Ok(new { success = true, message = "Message sent" });
                return BadRequest(new { success = false, message = "Failed to send message" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
        /// <summary>
        /// Get chats by user
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpGet("chat-history/{user1}/{user2}")]
        [ProducesResponseType(typeof(ChatMessage), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetChatHistory(int user1, int user2)
        {
            try
            {
                var messages = await _UsersRepository.GetChatHistoryAsync(user1, user2);
                return Ok(messages);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
        /// <summary>
        /// Get user's chats
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpGet("chat-users/{userId}")]
        [ProducesResponseType(typeof(IEnumerable<ChatUser>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetChatUsers(int userId)
        {
            try
            {
                var users = await _UsersRepository.GetChatUsersAsync(userId);
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
        [HttpPost("mark-as-read")]
        public async Task<IActionResult> MarkMessagesAsRead([FromBody] ChatReadModel model)
        {
            try
            {
                var success = await _UsersRepository.MarkMessagesAsReadAsync(model.SenderID, model.ReceiverID);
                return Ok(new { success });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
        /// <summary>
        /// Get user by role
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpGet("users-by-role/{roleName}")]
        [ProducesResponseType(typeof(IEnumerable<ChatUser>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetUsersByRole(string roleName)
        {
            try
            {
                var users = await _UsersRepository.GetUsersByRoleAsync(roleName);
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
        [HttpGet("unread-count/{userId}")]
        [ProducesResponseType(typeof(UnreadCount), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetUnreadMessageCount(int userId)
        {
            try
            {
                var result = await _UsersRepository.GetUnreadMessageCountAsync(userId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
        /// <summary>
        /// Create group chat
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpPost("create-group-chat")]
        [ProducesResponseType(typeof(GroupChatResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CreateGroupChat([FromBody] GroupChatRequest request)
        {
            try
            {
                var groupId = await _UsersRepository.CreateGroupChatAsync(request);
                return Ok(new GroupChatResponse { GroupID = groupId });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
        /// <summary>
        /// Get group chats
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpGet("group-chat/{groupId}")]
        public async Task<IActionResult> GetGroupChatHistory(int groupId)
        {
            try
            {
                var result = await _UsersRepository.GetGroupChatMessagesAsync(groupId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
        /// <summary>
        /// Sent group messages
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpPost("send-group-message")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> SendGroupMessage([FromBody] GroupMessageRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            try
            {
                await _UsersRepository.SendGroupMessageAsync(request);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error sending message: {ex.Message}");
            }
        }
        [HttpPost("mark-group-read")]
        public async Task<IActionResult> MarkGroupMessagesAsRead([FromBody] GroupReadRequest req)
        {
            try
            {
                await _UsersRepository.MarkGroupMessagesAsReadAsync(req.GroupID, req.UserID);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error marking group messages as read: {ex.Message}");
            }
        }
        [HttpGet("total-unread-count/{userId}")]
        [ProducesResponseType(typeof(UnreadCount), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetTotalUnreadMessageCount(int userId)
        {
            try
            {
                var result = await _UsersRepository.GetUnreadMessageCountAsync(userId);
                var group = await _UsersRepository.GetGroupUnreadMessageCountAsync(userId);

                return Ok(new UnreadCount { Count = result.Count + group.Count });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
        /// <summary>
        /// Get all users
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpPost("admin-users")]
        [ProducesResponseType(typeof(IEnumerable<UserWithRole>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAllUsers([FromBody] UserFilterModel filter)
        {
            try
            {
                var (users, total) = await _UsersRepository.GetAllUsersAsync(filter.SearchTerm, filter.RoleName, filter.Page, filter.PageSize);

                return Ok(new
                {
                    success = true,
                    totalCount = total,
                    users = users
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }
        [HttpPut("toggle-user-status/{userId}")]
        public async Task<IActionResult> ToggleUserStatus(int userId)
        {
            var result = await _UsersRepository.ToggleUserStatusAsync(userId);
            if (!result)
                return NotFound(new { success = false, message = "User not found or update failed." });

            return Ok(new { success = true, message = "User status updated." });
        }
        /// <summary>
        /// Update user role
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpPost("update-role")]
        [ProducesResponseType(typeof(UpdateUserRoleRequest), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateUserRole([FromBody] UpdateUserRoleRequest request)
        {
            try
            {
                var result = await _UsersRepository.UpdateUserRoleAsync(request);
                if (!result)
                    return BadRequest("Failed to update role");

                return Ok(new { success = true, message = "User role updated." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        /// <summary>
        /// Get roles
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpGet("roles")]
        [ProducesResponseType(typeof(Roles), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetRoles()
        {
            try
            {
                var roles = await _UsersRepository.GetAllRolesAsync();
                return Ok(roles);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        /// <summary>
        /// Get category
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpGet("categories")]
        [ProducesResponseType(typeof(IEnumerable<Category>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetCategories()
        {
            try
            {
                var categories = await _UsersRepository.GetAllCategoriesAsync();
                return Ok(categories);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        /// <summary>
        /// Add category
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpPost("add-category")]
        [ProducesResponseType(typeof(CategoryModel), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AddCategory([FromBody] CategoryModel model)
        {
            try
            {
                var categoryId = await _UsersRepository.SaveCategoryAsync(model);
                return Ok(new { categoryID = categoryId });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
        /// <summary>
        /// Get all course title
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpGet("basic-courses")]
        [ProducesResponseType(typeof(IEnumerable<CourseDropdownModel>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllCoursesBasic()
        {
            try
            {
                var courses = await _UsersRepository.GetAllCoursesBasicAsync();
                return Ok(courses);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
        [HttpPost("upload-assignment-file")]
        public async Task<IActionResult> UploadAssignmentFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads/Assignments");
            if (!Directory.Exists(uploadsFolder)) Directory.CreateDirectory(uploadsFolder);

            var filePath = Path.Combine(uploadsFolder, Guid.NewGuid() + Path.GetExtension(file.FileName));

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var fileUrl = "/Uploads/Assignments/" + Path.GetFileName(filePath);
            return Ok(new { fileURL = fileUrl });
        }
        /// <summary>
        /// Get payments per course
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpGet("payments/by-course/{courseId}")]
        [ProducesResponseType(typeof(PaymentDetails), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetPaymentsByCourse(int courseId)
        {
            try
            {
                var (payments, summary) = await _UsersRepository.GetPaymentsByCourseIDAsync(courseId);

                return Ok(new
                {
                    payments,
                    summary
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving course payments: {ex.Message}");
            }
        }
        /// <summary>
        /// Add review per course
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpPost("course-reviews")]
        [ProducesResponseType(typeof(CourseReview), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AddOrUpdateCourseReview([FromBody] CourseReview review)
        {
            try
            {
                var success = await _UsersRepository.AddOrUpdateCourseReviewAsync(review);
                return success ? Ok(new { success = true, message = "Review saved successfully" })
                               : BadRequest("Review could not be saved.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error saving review: {ex.Message}");
            }
        }
        /// <summary>
        /// Get reviews per course
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpGet("course-reviews/{courseId}")]
        [ProducesResponseType(typeof(CourseReviewDisplay), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetCourseReviewsByCourseID(int courseId)
        {
            try
            {
                var reviews = await _UsersRepository.GetCourseReviewsByCourseIDAsync(courseId);
                return Ok(reviews);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving course reviews: {ex.Message}");
            }
        }
        /// <summary>
        /// Sent support request
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpPost("send")]
        [ProducesResponseType(typeof(SupportRequestDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> SendSupportRequest([FromBody] SupportRequestDto dto)
        {
            var user = await _UsersRepository.GetUserByIDAsync(dto.UserID);
            if (user == null)
                return NotFound("User not found.");

            var saved = await _UsersRepository.AddSupportTicketAsync(dto);
            if (!saved)
                return StatusCode(500, "Failed to save ticket.");

            await _emailService.SendSupportEmailAsync("onlinecourse.management07@gmail.com", dto, $"{user.FirstName} {user.LastName}", user.Email);

            return Ok(new { success = true, message = "Support request submitted successfully." });
        }
        /// <summary>
        /// Get aggregated dashboard data for admin view
        /// </summary>
        /// <returns>Returns dashboard KPIs and recent activities</returns>
        [HttpGet("admin-dashboard")]
        [ProducesResponseType(typeof(AdminDashboardData), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAdminDashboard()
        {
            try
            {
                var dashboardData = await _UsersRepository.GetAdminDashboardDataAsync();

                if (dashboardData == null)
                    return NotFound();

                return Ok(dashboardData);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving admin dashboard data: {ex.Message}");
            }
        }
        /// <summary>
        /// AI Tutor Chat
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [AllowAnonymous]
        [HttpPost("chat")]
        public async Task<IActionResult> Chat([FromBody] ChatRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Message))
                return BadRequest("Message is required");

            var reply = await _aiService.GetChatResponseAsync(request.Message);
            return Ok(new { reply });
        }
        /// <summary>
        /// Get pending instructors for approval
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpGet("pending-instructors")]
        [ProducesResponseType(typeof(PendingInstructor), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetPendingInstructors()
        {
            try
            {
                var pendingInstructors = await _UsersRepository.GetPendingInstructorsAsync();

                if (pendingInstructors == null || !pendingInstructors.Any())
                    return NotFound(new { Message = "No pending instructors found." });

                return Ok(pendingInstructors);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while fetching pending instructors.", Error = ex.Message });
            }
        }

        /// <summary>
        /// To approve instructor by ID
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpPost("approve-instructor/{userId}")]
        [ProducesResponseType(typeof(PendingInstructor), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ApproveInstructor(int userId)
        {
            try
            {
                var result = await _UsersRepository.ApproveInstructorAsync(userId);

                if (result)
                    return Ok(new { Message = "Instructor approved successfully." });

                return BadRequest(new { Message = "Failed to approve instructor. User may not exist or is already approved." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while approving the instructor.", Error = ex.Message });
            }
        }
        /// <summary>
        /// To fetch student dashboard by ID
        /// </summary>
        /// <returns>Returns the result object , 404 if not found , 500 if failed.</returns>
        [HttpGet("dashboard/{userId}")]
        [ProducesResponseType(typeof(StudentDashboard), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetStudentDashboard(int userId)
        {
            try
            {
                var dashboard = await _UsersRepository.GetStudentDashboardAsync(userId);
                return Ok(dashboard);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while fetching student's dashboard.", Error = ex.Message });
            }
        }
    }
}


