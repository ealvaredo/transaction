import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  usuario = new FormGroup( {
  numeroCliente : new FormControl(),
  lastName : new FormControl('', [Validators.required]),
  user : new FormControl('', [Validators.required, Validators.pattern('\\d{11}')]),
  mail : new FormControl('', [Validators.required]),
  telefono : new FormControl(),
  provincia : new FormControl(),
  localidad : new FormControl()});

  constructor(private router: Router, private httpClient : HttpClient) { }

  submitted: Boolean = false;


  ngOnInit() {

    this.submitted = false;

  }


  onSubmit() {

    this.submitted = true;

  console.log(this.usuario.valid);
      

    if (this.usuario.valid) {
      this.httpClient.post(
        environment.url + '/client/crear', this.usuario.value).subscribe( 
          data => this.router.navigate(['/usuarioconfirmacion']), error=> this.mostrarError(error.error)
          )
        }
    }


    mostrarError(error) {
      console.log(error);
       if (error == 'Mandatory parameter - last name - was not found') {
      this.usuario.get("lastName").setErrors({serverError: 'La razón social es un valor requerido.' });
       } else if (error == 'Mandatory parameter - mail - was not found') {
        this.usuario.get("mail").setErrors({serverError: 'El mail es un valor requerido.' });
      } else if (error == 'Mandatory parameter - password - was not found') {
        this.usuario.get("user").setErrors({serverError: 'El CUIT es un valor requerido.' });
      } else if (error == 'Mandatory parameter - mail - with bad content') {
        this.usuario.get("mail").setErrors({serverError: 'El email no tiene un formato válido.' });
      } else if (error == 'Existing mail') {
        this.usuario.get("mail").setErrors({serverError: 'Ya existe un usuario registrado con ese mail.' });
      } else if (error == 'Existing username') {
        this.usuario.get("user").setErrors({serverError: 'Ya existe un usuario con ese número de CUIT.' });
      }

      
     
      
   } 
  
    onCancelar() {
      this.router.navigate(['/launcher']);
      
    }

  get numeroCliente() { return this.usuario.get('numeroCliente'); }
  get lastName() { return this.usuario.get('lastName'); }
  get mail() { return this.usuario.get('mail'); }
  get user() { return this.usuario.get('user'); }
}
