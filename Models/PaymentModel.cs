namespace OnlineCourseApi.Models
{
    public class PaymentModel
    {
        public int UserID { get; set; }
        public int CourseID { get; set; }
        public decimal Amount { get; set; }
        public string PaymentStatus { get; set; }
        public string CreatedBy { get; set; }
    }
}
