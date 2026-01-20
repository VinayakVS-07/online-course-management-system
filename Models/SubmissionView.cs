namespace OnlineCourseApi.Models
{
    public class SubmissionView
    {
        public int SubmissionID { get; set; }
        public int UserID { get; set; }
        public string StudentName { get; set; }
        public int CourseID { get; set; }
        public int AssignmentID { get; set; }
        public DateTime SubmissionOn { get; set; }
        public decimal? Grade { get; set; }
        public string Feedback { get; set; }
        public string FileURL { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? ModifiedAt { get; set; }
    }
}
