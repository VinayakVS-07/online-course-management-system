namespace OnlineCourseApi.Models
{
    public class DashboardEnrollment
    {
        public int EnrollmentID { get; set; }
        public int UserID { get; set; }
        public int CourseID { get; set; }
        public DateTime EnrollmentDate { get; set; }
        public string Status { get; set; }
    }
}
