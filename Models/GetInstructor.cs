namespace OnlineCourseApi.Models
{
    public class GetInstructor
    {
        public int UserID { get; set; }
        public string InstructorName { get; set; } = "";
        public string Email { get; set; } = "";
        public string Phone { get; set; } = "";
        public string RegisteredDate { get; set; } = "";
        public string Status { get; set; } = "";
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 5;
        public string SearchTerm { get; set; } = "";

    }
}
