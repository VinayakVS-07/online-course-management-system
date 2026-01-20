namespace OnlineCourseApi.Models
{
    public class CourseAssignment
    {
        public int AssignmentID { get; set; }
        public string Title { get; set;}
        public string Description { get; set;}
        public DateTime DueDate { get; set;}
        public string FileURL { get; set;}
        public string CourseTitle { get; set;}
    }
}
