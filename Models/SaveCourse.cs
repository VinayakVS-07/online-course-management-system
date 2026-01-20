namespace OnlineCourseApi.Models
{
    public class SaveCourse
    {
        public int CourseID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int CategoryID { get; set; }
        public int UserID { get; set; }
        public string Duration { get; set; }
        public decimal Price { get; set; }
        public string Status { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
    }
}
