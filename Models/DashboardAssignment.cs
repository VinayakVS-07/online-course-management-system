namespace OnlineCourseApi.Models
{
    public class DashboardAssignment
    {
        public int AssignmentID { get; set; }
        public int CourseID { get; set; }
        public string Title { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
