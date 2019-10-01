import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators , ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../service/authentication-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  login = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  submitted: Boolean = false;

  constructor(private router: Router, private httpClient: HttpClient, private authenthicationService : AuthenticationService) { }

  ngOnInit() {
    this.authenthicationService.logOut();
  }

  onSubmit() {
    this.authenthicationService.logOut();
    this.submitted = true;
    console.log(this.login.value);
    if (this.login.valid) {

      this.authenthicationService.authenticate(this.username.value, this.password.value).subscribe(
          (data:{}) =>  this.router.navigate(['/launcher']), error => this.mostrarError(error)
        )
    }  else {
      console.log('no valido');
    }
  }

  mostrarError(error) {
      this.login.get('password').setErrors({ 'serverError': 'Login incorrecto.' });
      console.log(this.login.get('password').errors);

    }

  get password() { return this.login.get('password'); }
  get username() { return this.login.get('username'); }

}
