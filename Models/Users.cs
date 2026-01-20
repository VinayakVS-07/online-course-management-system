namespace OnlineCourseApi.Models
{
    public class Users
    {
        public int UserID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string RoleName { get; set; }
        public string Status { get; set; }
        public int IsActive { get; set; }
    }

}
