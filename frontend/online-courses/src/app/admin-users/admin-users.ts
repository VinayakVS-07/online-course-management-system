import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Auth } from '../services/auth.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ChangeRoleDialog } from '../change-role-dialog/change-role-dialog';
import { ApproveInstructorsDialog } from '../approve-instructors-dialog/approve-instructors-dialog';

@Component({
  selector: 'app-admin-users',
  standalone: false,
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css'
})
export class AdminUsers implements OnInit, AfterViewInit {

// TABLE & FILTER CONFIG

  displayedColumns: string[] = ['name', 'email', 'phone', 'role', 'registeredDate', 'status', 'action'];
  dataSource = new MatTableDataSource<any>();
  totalCount = 0;

  searchTerm = '';
  roleFilter = 'All';

  roles: any[] = [];
  adminUser: any;

  filter = {
    page: 1,
    pageSize: 5,
    searchTerm: '',
    roleName: null as string | null
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private auth: Auth, private dialog: MatDialog) {}

 // Initializes admin user, roles, and user list

  ngOnInit(): void {
    this.adminUser = this.auth.getLoggedInUser();
    this.loadRoles();
    this.loadUsers();
  }

// Assigns sorting logic after view initialization

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
   
  }

  // Loads users from the server based on search and role filters

  loadUsers() {
    this.filter.searchTerm = this.searchTerm.trim();
    this.filter.roleName = this.roleFilter === 'All' ? null : this.roleFilter;

    this.auth.getAllUsers(this.filter).subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res.users);
        this.totalCount = res.totalCount;

        this.dataSource.sort = this.sort;

        this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'name': return `${item.firstName} ${item.lastName}`.toLowerCase();
          case 'email': return item.email?.toLowerCase() || '';
          case 'phone': return item.phone || '';
          case 'role': return item.roleName?.toLowerCase() || '';
          case 'registeredDate': return new Date(item.registeredDate);
          case 'status': return item.status?.toLowerCase() || '';
          default: return item[property];
        }
      };
    },
      error: () => alert('Failed to load users')
    });
  }


openApproveDialog() {
  const dialogRef = this.dialog.open(ApproveInstructorsDialog, {
    width: '600px',
  });

  dialogRef.afterClosed().subscribe((changed) => {
    if (changed) {
      this.loadUsers(); 
    }
  });
}

// Toggles the user's active/inactive status

toggleStatus(user: any) {
  const confirmMsg = user.isActive ? 'Deactivate this user?' : 'Activate this user?';
  if (confirm(confirmMsg)) {
    this.auth.toggleUserStatus(user.userID).subscribe({
      next: () => {
        this.loadUsers(); 
      },
      error: () => alert('Failed to update status')
    });
  }
}

// Loads all available roles from the server

loadRoles() {
  this.auth.getAllRoles().subscribe({
    next: (res) => this.roles = res,
    error: () => alert('Failed to load roles')
  });
}

// Opens a dialog to change the user's role

 openChangeRoleDialog(user: any) {
    const dialogRef = this.dialog.open(ChangeRoleDialog, {
      width: '300px',
      data: { user, roles: this.roles }
    });

    dialogRef.afterClosed().subscribe((newRoleID: number | null) => {
      const currentRoleID = this.getRoleIDFromName(user.roleName);

      if (
        newRoleID !== null &&
        newRoleID !== undefined &&
        newRoleID !== currentRoleID
      ) {
        const payload = {
          userID: user.userID,
          newRoleID: newRoleID,
          modifiedBy: this.adminUser?.firstName || 'admin'
        };

        this.auth.updateUserRole(payload).subscribe({
          next: () => {
            user.roleName = this.getRoleName(newRoleID);
          },
          error: () => alert('Failed to update role')
        });
      }
    });
  }

// Returns the role name for a given role ID

getRoleName(roleID: number): string {
  const role = this.roles.find(r => r.roleID === roleID);
  return role ? role.roleName : '';
}


getRoleIDFromName(roleName: string): number | null {
  const match = this.roles.find((r) => r.roleName?.toLowerCase() === roleName?.toLowerCase());
  return match ? match.roleID : null;
}

// Handles pagination change and reloads user list

  onPageChange(event: PageEvent) {
    this.filter.page = event.pageIndex + 1;
    this.filter.pageSize = event.pageSize;
    this.loadUsers();
  }

// Applies the search term and reloads the user list

  applySearch() {
    this.filter.page = 1;
    this.loadUsers();
  }

// Clears the search input and reloads all users

  clearSearch() {
    this.searchTerm = '';
    this.applySearch();
  }

// Filters users based on selected role

  onRoleFilterChange() {
    this.filter.page = 1;
    this.loadUsers();
  }
}