namespace OnlineCourseApi.Models
{
    public class InstructorEarnings
    {
        public string CourseName { get; set; } = "";
        public int TotalEnrollments { get; set; }
        public decimal TotalEarnings { get; set; }
    }
}
