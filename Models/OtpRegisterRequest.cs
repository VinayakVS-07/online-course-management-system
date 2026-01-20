namespace OnlineCourseApi.Models
{
    public class OtpRegisterRequest : RegisterUser
    {
        public string OTP { get; set; }
    }
}
