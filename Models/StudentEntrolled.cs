namespace OnlineCourseApi.Models
{
    public class StudentEntrolled
    {
        public int UserID { get; set; }
        public string StudentName { get; set; }
        public string Email { get; set; }
        public DateTime EnrollmentDate { get; set; }
        public string Status { get; set; }
    }
}
