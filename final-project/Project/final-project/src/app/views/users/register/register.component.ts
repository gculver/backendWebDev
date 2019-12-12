import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { userNameValidator } from 'src/app/validators/user-name.Validators';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // signUpForm = new FormGroup({
  //   userName: new FormControl(''),
  //   email: new FormControl(''),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl('')
  // });
  constructor(private formBuilder: FormBuilder, private _registerService: RegisterService) {}
    signUpForm = this.formBuilder.group({
      userName: [
        '', [Validators.required, userNameValidator(/admin/)]
      ],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4)]]
    });
    get userName() {
      return this.signUpForm.get('userName');
    }

  ngOnInit() {}

  onSubmit() {
    this._registerService
      .register(this.signUpForm.value)
      .subscribe(
        data => console.log('Success!', data),
        error => console.log('Error!', error)
      );
  }

}
