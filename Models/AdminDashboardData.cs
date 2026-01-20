namespace OnlineCourseApi.Models
{
    public class AdminDashboardData
    {
        public DashboardKPI KPIs { get; set; }
        public List<DashboardEnrollment> LatestEnrollments { get; set; }
        public List<DashboardPayment> LatestPayments { get; set; }
        public List<DashboardAssignment> LatestAssignments { get; set; }
    }
}
