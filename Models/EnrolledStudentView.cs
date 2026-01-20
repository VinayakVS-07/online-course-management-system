namespace OnlineCourseApi.Models
{
    public class EnrolledStudentView
    {
        public int EnrollmentID { get; set; }
        public int UserID { get; set; }
        public string StudentName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime EnrollmentDate { get; set; }
        public string Status { get; set; }
    }
}
