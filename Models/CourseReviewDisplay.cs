namespace OnlineCourseApi.Models
{
    public class CourseReviewDisplay
    {
        public int ReviewID { get; set; }
        public int UserID { get; set; }
        public string StudentName { get; set; }
        public int Rating { get; set; }
        public string ReviewText { get; set; }
        public DateTime ReviewDate { get; set; }
    }
}
