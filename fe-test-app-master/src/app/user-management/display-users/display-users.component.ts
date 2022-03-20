import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from "../../services/user-service/user.service";
import { User } from "../models/user.model";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { UserStatus } from "../enums/user-status.enum";

@Component({
  selector: 'exads-user-management',
  templateUrl: './display-users.component.html',
  styleUrls: ['./display-users.component.scss'],
  // todo implement once loading all users
  //https://app.pluralsight.com/course-player?clipId=f01b8267-91b8-41db-8433-b6a29532ac7e -> Improving change Detection
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayUsersComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['username', 'fullName', 'email', 'status', 'dateCreated'];
  users: User[] = [];
  errorMessage = '';
  dataSource = new MatTableDataSource<User>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      {
        next: users => this.dataSource.data = users,
        error: err => this.errorMessage = err
      }
    )
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getStatus(userStatus: number): string {
    return UserStatus[userStatus];
  }
}
