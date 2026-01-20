import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { Auth } from '../services/auth.service';
import { finalize } from 'rxjs/operators';

interface DashboardKPI {
  totalStudents: number;
  totalCourses: number;
  totalInstructors: number;
  totalAssignments: number;
  totalPayments: number;
}

interface DashboardEnrollment {
  enrollmentID: number;
  userID: number;
  courseID: number;
  enrollmentDate: string;
  status: string;
}

interface DashboardPayment {
  paymentID: number;
  userID: number;
  amount: number;
  paymentDate: string;
  paymentStatus: string ;
}

interface DashboardAssignment {
  assignmentID: number;
  courseID: number;
  title: string;
  createdDate: string;
}

interface AdminDashboardData {
  kpIs: DashboardKPI; // match backend property exactly
  latestEnrollments: DashboardEnrollment[];
  latestPayments: DashboardPayment[];
  latestAssignments: DashboardAssignment[];
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboard implements OnInit {
  // UI state
  isLoading = true;
  error = '';

  // Backend data holder (typed)
  dashboardData!: AdminDashboardData;

  // Material tables
  enrollmentsData = new MatTableDataSource<DashboardEnrollment>([]);
  paymentsData = new MatTableDataSource<DashboardPayment>([]);
  assignmentsData = new MatTableDataSource<DashboardAssignment>([]);

  enrollCols = ['enrollmentID', 'userID', 'courseID', 'enrollmentDate', 'status'];
  paymentsCols = ['paymentID', 'userID', 'amount', 'paymentDate', 'paymentStatus'];
  assignCols = ['assignmentID', 'courseID', 'title', 'createdDate'];

  // Chart (we will build from latestPayments)
  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Recent Payments',
        fill: true,
        tension: 0.3,
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25,118,210,0.15)'
      }
    ]
  };
  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { display: true }
    }
  };

  constructor(private auth: Auth) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  private loadDashboard() {
    this.isLoading = true;
    this.error = '';

    this.auth.getAdminDashboardData().pipe(
      finalize(() => (this.isLoading = false))
    ).subscribe({
      next: (res: any) => {
        // Defensive: backend sends kpIs (note the casing)
        if (!res) {
          this.error = 'No dashboard data returned from server.';
          return;
        }

        // Map onto typed structure
        this.dashboardData = {
          kpIs: res.kpIs ?? {
            totalStudents: 0, totalCourses: 0, totalInstructors: 0, totalAssignments: 0, totalPayments: 0
          },
          latestEnrollments: res.latestEnrollments ?? [],
          latestPayments: res.latestPayments ?? [],
          latestAssignments: res.latestAssignments ?? []
        };

        // Fill tables
        this.enrollmentsData.data = this.dashboardData.latestEnrollments;
        this.paymentsData.data = this.dashboardData.latestPayments;
        this.assignmentsData.data = this.dashboardData.latestAssignments;

        // Build chart from latestPayments (use paymentDate as label)
        this.buildPaymentsChart(this.dashboardData.latestPayments);
      },
      error: (err) => {
        console.error('Dashboard load error', err);
        this.error = 'Failed to load dashboard data. Check server or network (see console).';
      }
    });
  }

  private buildPaymentsChart(payments: DashboardPayment[]) {
    if (!payments || payments.length === 0) {
      this.lineChartData.labels = [];
      this.lineChartData.datasets[0].data = [];
      return;
    }

    // Sort by date ascending so chart flows left->right
    const sorted = [...payments].sort((a, b) => {
      const da = new Date(a.paymentDate).getTime();
      const db = new Date(b.paymentDate).getTime();
      return da - db;
    });

 
    const labels = sorted.map(p => {
      const d = new Date(p.paymentDate);
      return d.toLocaleDateString(); // browser locale short date
    });

    const values = sorted.map(p => Number(p.amount ?? 0));

    this.lineChartData.labels = labels;
    this.lineChartData.datasets[0].data = values;
  }

  // Helpful display helpers
  get totalStudents() { return this.dashboardData?.kpIs?.totalStudents ?? 0; }
  get totalCourses() { return this.dashboardData?.kpIs?.totalCourses ?? 0; }
  get totalInstructors() { return this.dashboardData?.kpIs?.totalInstructors ?? 0; }
  get totalAssignments() { return this.dashboardData?.kpIs?.totalAssignments ?? 0; }
  get totalPayments() { return this.dashboardData?.kpIs?.totalPayments ?? 0; }
}