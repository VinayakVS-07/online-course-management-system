namespace OnlineCourseApi.Models
{
    public class StudentProgress
    {
        public int UserID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Status { get; set; }
        public int CourseID { get; set; }
        public string CourseTitle { get; set; }
        public int TotalAssigned { get; set; }
        public int TotalSubmitted { get; set; }
    }
}
