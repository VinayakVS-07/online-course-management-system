namespace OnlineCourseApi.Models
{
    public class UserPayment
    {
        public int PaymentID { get; set; }
        public string CourseName { get; set; } = "";
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; }
        public string PaymentStatus { get; set; } = "";
    }
}
