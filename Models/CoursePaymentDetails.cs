namespace OnlineCourseApi.Models
{
    public class CoursePaymentDetails
    {
        public int PaymentID { get; set; }
        public int UserID { get; set; }
        public string StudentName { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; }
        public string PaymentStatus { get; set; }
    }
    public class CourseEarningsSummary
    {
        public int CourseID { get; set; }
        public decimal TotalEarnings { get; set; }
    }
}
