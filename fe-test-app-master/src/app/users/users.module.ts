import { NgModule } from "@angular/core";
import { UsersComponent } from "./users.component";
import { CreateUserComponent } from "./create-user/create-user.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { CustomDatePipe } from "../shared/custom-date.pipe";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatSortModule } from "@angular/material/sort";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSelectModule } from "@angular/material/select";
import { MatListModule } from "@angular/material/list";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  declarations: [UsersComponent, CreateUserComponent, CustomDatePipe],
  imports: [CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSortModule,
    MatSnackBarModule,
    RouterModule,
    FormsModule,
    MatSelectModule,
    MatListModule,
    MatProgressSpinnerModule],
  providers: []

})
export class UsersModule {
}
