namespace OnlineCourseApi.Models
{
    public class ChatUser
    {
        public int UserID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string RoleName { get; set; }
        public int UnreadCount { get; set; }
        public DateTime? LastMessageTime { get; set; }

        public bool IsGroup { get; set; } 
        public int? GroupID { get; set; } 
        public string GroupName { get; set; }
    }
}
