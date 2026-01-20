namespace OnlineCourseApi.Models
{
    public class StudentSubmissionView
    {
        public int SubmissionID { get; set; }
        public int AssignmentID { get; set; }
        public int CourseID { get; set; }
        public string AssignmentTitle { get; set; }
        public string CourseTitle { get; set; }
        public string FileURL { get; set; }
        public DateTime SubmissionOn { get; set; }
        public decimal? Grade { get; set; }
        public string Feedback { get; set; }
    }
}
