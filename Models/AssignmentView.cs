namespace OnlineCourseApi.Models
{
    public class AssignmentView
    {
        public int AssignmentID { get; set; }
        public int CourseID { get; set; }
        public string CourseTitle { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime? DueDate { get; set; }
        public string FileURL { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? ModifiedAt { get; set; }
        
    }
}
