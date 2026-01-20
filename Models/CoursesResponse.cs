namespace OnlineCourseApi.Models
{
    public class CoursesResponse
    {
        public IEnumerable<Courses> CourseList { get; set; }
        public int TotalCount { get; set; }
    }
}
