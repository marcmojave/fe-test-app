import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from "./users/users.component";
import { CreateUserComponent } from "./users/create-user/create-user.component";


const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'users/create',
    component: CreateUserComponent
  },
  // could set up a redirect component here 404 or some such
  {
    path: '*',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
