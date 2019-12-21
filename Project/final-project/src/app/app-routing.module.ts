import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { RegisterComponent } from './views/users/register/register.component';
import { DisplayInventoryComponent } from './views/inventory/display-inventory/display-inventory.component';
import { AddInventoryComponent } from './views/inventory/add-inventory/add-inventory.component';
import { LoginComponent } from './views/users/login/login.component';
import { SignupComponent } from './views/users/signup/signup.component';
import { AuthGuard } from './views/users/auth.guard';

const routes: Routes = [
  { path: '' , component: DisplayInventoryComponent, canActivate: [AuthGuard] }, // canActiveate: [AuthGuard]
  { path: 'add', component: AddInventoryComponent, canActivate: [AuthGuard] },
 // { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
