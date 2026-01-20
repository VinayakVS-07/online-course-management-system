namespace OnlineCourseApi.Models
{
    public class GroupMessage
    {
        public int GroupMessageID { get; set; }
        public int GroupID { get; set; }
        public int SenderID { get; set; }
        public string SenderName { get; set; }
        public string Message { get; set; }
        public DateTime SentAt { get; set; }
    }
}
