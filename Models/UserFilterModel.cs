namespace OnlineCourseApi.Models
{
    public class UserFilterModel
    {
        public string? SearchTerm { get; set; }
        public string? RoleName { get; set; }
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}
