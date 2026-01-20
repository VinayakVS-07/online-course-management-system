namespace OnlineCourseApi.Models
{
    public class UserWithRole
    {
        public int UserID { get; set; }
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        public string Email { get; set; } = "";
        public string Phone { get; set; } = "";
        public string RegisteredDate { get; set; } = "";
        public string Status { get; set; } = "";
        public bool IsActive { get; set; }
        public string RoleName { get; set; } = "";
    }
}
