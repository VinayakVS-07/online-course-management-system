namespace OnlineCourseApi.Models
{
    public class Payments
    {
        public int StudentID { get; set; }
        public int CourseID { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; }
        public string PaymentStatus { get; set; }
    }
}
