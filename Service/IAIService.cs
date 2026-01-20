namespace OnlineCourseApi.Service
{
    public interface IAIService
    {
        Task<string> GetChatResponseAsync(string prompt);
    }
}
