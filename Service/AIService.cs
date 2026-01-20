using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace OnlineCourseApi.Service
{
    public class AIService : IAIService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;

        public AIService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _apiKey = configuration["Gemini:ApiKey"];
        }

        public async Task<string> GetChatResponseAsync(string userMessage)
        {
            // prompt 
            string prompt = $@"
            You are an AI Chatbot Tutor for an online course platform. 
            Always give clear, student-friendly answers with examples where possible.
            Be encouraging, and keep responses short and easy to understand.

            Student Question: {userMessage}";

            var requestBody = new
            {
                contents = new[]
                {
                new
                {
                    role = "user",
                    parts = new[]
                    {
                        new { text = prompt }
                    }
                }
            }
            };

            var content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync(
                $"https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key={_apiKey}",
                content
            );

            response.EnsureSuccessStatusCode();
            var result = await response.Content.ReadAsStringAsync();

            using var jsonDoc = JsonDocument.Parse(result);
            var reply = jsonDoc.RootElement
                .GetProperty("candidates")[0]
                .GetProperty("content")
                .GetProperty("parts")[0]
                .GetProperty("text")
                .GetString();

            return reply ?? "I couldn’t generate a response.";
        }
    }
}
