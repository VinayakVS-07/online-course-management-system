namespace OnlineCourseApi.Models
{
    public class GroupMessageRequest
    {
        public int GroupID { get; set; }
        public int SenderID { get; set; }
        public string Message { get; set; }

    }
}
