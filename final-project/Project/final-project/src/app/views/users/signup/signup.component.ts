import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  styleUrls: ['./signup.component.css'],
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit, OnDestroy {
  private authStatusSub: Subscription;

  constructor(public authService: AuthService) {}

  onSignUp(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form.value.email);
    this.authService.createUser(form.value.email, form.value.password);
  }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {

      }
    );
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
