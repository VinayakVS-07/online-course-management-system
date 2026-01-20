namespace OnlineCourseApi.Models
{
    public class Courses
    {
        public int CourseID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string? CategoryName { get; set; }
        public string Duration { get; set; }
        public decimal Price { get; set; }
        public string? InstructorName { get; set; }
        public string? Status { get; set; }
        public int EnrolledCount { get; set; }
        public int Page {  get; set; }
        public int PageSize { get; set; }
    }
}
