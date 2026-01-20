namespace OnlineCourseApi.Models
{
    public class PaymentDetails
    {
        public int UserID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public int CourseID { get; set; }
        public string CourseTitle { get; set; }
        public int PaymentID { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; }
        public string PaymentStatus { get; set; }

    }
}
