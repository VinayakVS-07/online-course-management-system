namespace OnlineCourseApi.Models
{
    public class EmailOtp
    {
        public int OtpID { get; set; }
        public string Email { get; set; }
        public string OTP { get; set; }
        public DateTime Expiry { get; set; }
        public bool IsUsed { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
