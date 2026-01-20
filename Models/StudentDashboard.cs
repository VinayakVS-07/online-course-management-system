namespace OnlineCourseApi.Models
{
    public class StudentDashboard
    {
        public List<MyEnrollment> EnrolledCourses { get; set; } = new();
        public List<StudentSubmissionView> Submissions { get; set; } = new();

        // Derived fields for quick summary
        public int TotalCourses => EnrolledCourses.Count;
        public double OverallProgress => EnrolledCourses.Count == 0
            ? 0
            : EnrolledCourses.Average(c => c.Progress);

        public double CompletionRate => EnrolledCourses.Sum(c => c.TotalAssigned) == 0
            ? 0
            : (double)EnrolledCourses.Sum(c => c.TotalSubmitted) / EnrolledCourses.Sum(c => c.TotalAssigned) * 100;

        public decimal? AverageGrade => Submissions.Count == 0
            ? null
            : Submissions.Where(s => s.Grade.HasValue).Average(s => s.Grade);
    }
}
