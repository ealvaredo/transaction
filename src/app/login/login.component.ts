import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  login = new FormGroup({
    user: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });


  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.login.value);
      
      this.httpClient.post(
        environment.url + '/user/login', this.login.value, this.httpOptions).subscribe(
          data => this.router.navigate(['/launcher']), error => this.mostrarError(error.error)
        )
  }

  mostrarError(error) {
    console.log(error);
      this.login.get("user").setErrors({ serverError: 'Login incorrecto.' });
  }


}
