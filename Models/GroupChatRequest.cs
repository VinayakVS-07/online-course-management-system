namespace OnlineCourseApi.Models
{
    public class GroupChatRequest
    {
        public string GroupName { get; set; }
        public int CreatedBy { get; set; }
        public List<int> ParticipantIDs { get; set; }
    }
    public class GroupChatResponse
    {
        public int GroupID { get; set; }
    }
}
