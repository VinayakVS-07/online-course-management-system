namespace OnlineCourseApi.Models
{
    public class SubmissionCreate
    {
        public int UserID { get; set; }
        public int CourseID { get; set; }
        public int AssignmentID { get; set; }
        public string FileURL { get; set; }
        public string CreatedBy { get; set; }
    }
}
