namespace OnlineCourseApi.Models
{
    public class ChatMessage
    {
        public int? ChatID { get; set; }
        public int SenderID { get; set; }
        public string? SenderName { get; set; }
        public int ReceiverID { get; set; }
        public string? ReceiverName { get; set; }
        public string Message { get; set; }
        public DateTime? SentAt { get; set; }
        public bool? IsRead { get; set; }
    }
}
