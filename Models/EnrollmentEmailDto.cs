namespace OnlineCourseApi.Models
{
    public class EnrollmentEmailDto
    {
        public string StudentEmail { get; set; }
        public string StudentName { get; set; }
        public string CourseTitle { get; set; }
        public DateTime StartDate { get; set; }
        public string Duration { get; set; }
        public string InstructorName { get; set; }
        public int PaymentID { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; }
    }
}
