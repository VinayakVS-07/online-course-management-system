namespace OnlineCourseApi.Models
{
    public class Instructor
    {
        public int CourseID { get; set; }
        public string Title { get; set; }
        public string description { get; set; }
        public string Status { get; set; }
        public decimal Price { get; set; }
        public string Duration { get; set; }
        public string InstructorName { get; set; }
    }
}
