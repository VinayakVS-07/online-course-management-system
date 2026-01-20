namespace OnlineCourseApi.Models
{
    public class UpdateUserRoleRequest
    {
        public int UserID { get; set; }
        public int NewRoleID { get; set; }
        public string ModifiedBy { get; set; }
    }
}
