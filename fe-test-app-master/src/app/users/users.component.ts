import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { User } from "./shared/user.model";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { UserStatus } from "./shared/user-status.enum";
import { MatSort } from "@angular/material/sort";
import { ResponseError } from "./shared/response-error.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserService } from "../services/user.service";
import { MatSelectChange } from "@angular/material/select";

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, AfterViewInit {

  public displayedColumns: string[] = ['username', 'fullName', 'email', 'status', 'dateCreated'];
  public pageSizeOptions: number[] = [10, 20, 30];
  public defaultPageSize: number = 20;
  public dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private userService: UserService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getUsers();
  }

  setRowsPerPage(matSelectChange: MatSelectChange) {
    if (matSelectChange) {
      this.changePageSize(matSelectChange.source.value);
    }
  }

  changePageSize(size: number): void {
    this.paginator.pageSize = size;
    this.paginator.page.emit()
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      {
        next: users => this.dataSource.data = [...users],
        error: (err: ResponseError) => {
          this.openSnackBar(err.userMessage, 'Close');
        }
      }
    )
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  getStatus(userStatus: number): string {
    return UserStatus[userStatus];
  }
}
