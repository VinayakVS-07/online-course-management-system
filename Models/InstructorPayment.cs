namespace OnlineCourseApi.Models
{
    public class InstructorPayment
    {
        public int PaymentID { get; set; }
        public string StudentName { get; set; } = "";
        public string CourseName { get; set; } = "";
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; }
        public string PaymentStatus { get; set; } = "";
    }
}
