namespace OnlineCourseApi.Models
{
    public class DashboardPayment
    {
        public int PaymentID { get; set; }
        public int UserID { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; }
        public string? PaymentStatus { get; set; }
    }
}
