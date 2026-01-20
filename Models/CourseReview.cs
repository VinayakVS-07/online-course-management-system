namespace OnlineCourseApi.Models
{
    public class CourseReview
    {
        public int UserID { get; set; }
        public int CourseID { get; set; }
        public int Rating { get; set; }
        public string ReviewText { get; set; }
        public string CreatedBy { get; set; }
    }
}
