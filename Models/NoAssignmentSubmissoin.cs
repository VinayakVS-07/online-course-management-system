namespace OnlineCourseApi.Models
{
    public class NoAssignmentSubmissoin
    {
        public int UserID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int CourseID { get; set; }  
        public string CourseTitle { get; set; }
        public string AssignmentID { get; set; }
        public string AssignmentTitle { get; set; }
    }
}
