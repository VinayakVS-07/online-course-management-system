using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using OnlineCourseApi.Models;

namespace OnlineCourseApi.Service
{
    public class EmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendEnrollmentConfirmationEmailAsync(EnrollmentEmailDto dto)
        {
            var smtpHost = _config["EmailSettings:SmtpHost"];
            var smtpPort = int.Parse(_config["EmailSettings:SmtpPort"]);
            var senderEmail = _config["EmailSettings:SenderEmail"];
            var senderPassword = _config["EmailSettings:SenderPassword"];

            var subject = $"Enrollment Confirmation - {dto.CourseTitle}";
            var body = $@"
            <h3>Hello {dto.StudentName},</h3>
            <p>You have successfully enrolled in <strong>{dto.CourseTitle}</strong>.</p>
            <ul>
                <li><strong>Payment ID:</strong> {dto.PaymentID}</li>
                <li><strong>Amount:</strong> ₹{dto.Amount}</li>
                <li><strong>Payment Date:</strong> {dto.PaymentDate:dd MMM yyyy}</li>
                <li><strong>Start Date:</strong> {dto.StartDate:dd MMM yyyy}</li>
                <li><strong>Duration:</strong> {dto.Duration} weeks</li>
                <li><strong>Instructor:</strong> {dto.InstructorName}</li>
            </ul>
            <p>Thank you for choosing our platform!</p>
            <br/>Regards,<br/>Online CMS Team
        ";

            using (var smtp = new SmtpClient(smtpHost, smtpPort))
            {
                smtp.Credentials = new NetworkCredential(senderEmail, senderPassword);
                smtp.EnableSsl = true;

                var mail = new MailMessage
                {
                    From = new MailAddress(senderEmail, "Online LMS"),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true
                };

                mail.To.Add(dto.StudentEmail);

                await smtp.SendMailAsync(mail);
            }
        }
        public async Task SendOtpEmailAsync(string email, string otp)
        {
            var subject = "Your OTP for CMS Registration";
            var body = $@"
        <p>Dear User,</p>
        <p>Your OTP for registration is: <strong>{otp}</strong></p>
        <p>This OTP is valid for 10 minutes. Do not share it with anyone.</p>
        <br/>Thanks,<br/>Online CMS Team
    ";

            await SendRawEmailAsync(email, subject, body);
        }

        public async Task SendRegistrationSuccessEmailAsync(string email, string firstName)
        {
            var subject = "Registration Successful - Welcome to Online CMS!";
            var body = $@"
        <p>Hi {firstName},</p>
        <p>Your registration is now complete. Welcome to the Online Course Management System Platform!</p>
        <p>You can now log in and start learning.</p>
        <br/>Best regards,<br/>Online CMS Team
        ";

            await SendRawEmailAsync(email, subject, body);
        }
        private async Task SendRawEmailAsync(string to, string subject, string body)
        {
            var smtpHost = _config["EmailSettings:SmtpHost"];
            var smtpPort = int.Parse(_config["EmailSettings:SmtpPort"]);
            var senderEmail = _config["EmailSettings:SenderEmail"];
            var senderPassword = _config["EmailSettings:SenderPassword"];

            using var smtp = new SmtpClient(smtpHost, smtpPort)
            {
                Credentials = new NetworkCredential(senderEmail, senderPassword),
                EnableSsl = true
            };

            var mail = new MailMessage
            {
                From = new MailAddress(senderEmail, "Online CMS"),
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            };

            mail.To.Add(to);
            await smtp.SendMailAsync(mail);
        }
        public async Task SendSupportEmailAsync(string toSupportEmail, SupportRequestDto dto, string userName, string userEmail)
        {
            var subject = $"[Support] {dto.Subject}";
            var body = $@"
        <p><strong>User:</strong> {userName} ({userEmail})</p>
        <p><strong>Message:</strong><br/>{dto.Message}</p>
        <p><strong>Submitted at:</strong> {DateTime.Now:dd MMM yyyy hh:mm tt}</p>
        ";

            await SendRawEmailAsync(toSupportEmail, subject, body);
        }

    }
}
