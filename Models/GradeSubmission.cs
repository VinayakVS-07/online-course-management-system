namespace OnlineCourseApi.Models
{
    public class GradeSubmission
    {
        public int SubmissionID { get; set; }
        public decimal Grade { get; set; }
        public string Feedback { get; set; }
        public string ModifiedBy { get; set; }
    }
}
