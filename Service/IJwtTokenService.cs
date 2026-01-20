using OnlineCourseApi.Models;

namespace OnlineCourseApi.Service
{
    public interface IJwtTokenService
    {
        string GenerateToken(Users user);
    }
}
