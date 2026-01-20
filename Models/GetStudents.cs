namespace OnlineCourseApi.Models
{
    public class GetStudents
    {
        public int UserID { get; set; }
        public string StudentName { get; set; } = "";
        public string Email { get; set; } = "";
        public string Phone { get; set; } = "";
        public string RegisteredDate { get; set; } = "";
        public string EnrolledCourses { get; set; } = "";
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 5;
        public string SearchTerm { get; set; } = "";
    }
}
