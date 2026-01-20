namespace OnlineCourseApi.Models
{
    public class MyEnrollment
    {
        public int EnrollmentID { get; set; }
        public int CourseID { get; set; }
        public string Title { get; set; } = string.Empty;
        public string InstructorName { get; set; } = string.Empty;
        public DateTime EnrollmentDate { get; set; }
        public string Status { get; set; }
        public int TotalAssigned { get; set; }
        public int TotalSubmitted { get; set; }
        public int Progress
        {
            get
            {
                if (TotalAssigned == 0) return 0;
                return (int)((double)TotalSubmitted / TotalAssigned * 100);
            }
        }
    }
}
