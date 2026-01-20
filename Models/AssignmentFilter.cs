namespace OnlineCourseApi.Models
{
    public class AssignmentFilter
    {
        public int? CourseID { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string SearchTerm { get; set; } = "";

    }
}
