import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSelectModule, MatCardModule, MatButtonModule, MatToolbarModule, MatTableModule, MatInputModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { DisplayInventoryComponent } from './views/inventory/display-inventory/display-inventory.component';
import { AddInventoryComponent } from './views/inventory/add-inventory/add-inventory.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './views/users/register/register.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './views/users/login/login.component';
import { SignupComponent } from './views/users/signup/signup.component';
import { AuthInterceptor } from './views/users/auth-interceptor';
import { AuthGuard } from './views/users/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DisplayInventoryComponent,
    AddInventoryComponent,
    RegisterComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
