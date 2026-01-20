namespace OnlineCourseApi.Models
{
    public class Top5Students
    {
        public int UserID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public int TotalSubmissions { get; set; }
    }
}
