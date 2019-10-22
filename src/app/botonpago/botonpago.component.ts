import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-botonpago',
  templateUrl: './botonpago.component.html',
  styleUrls: ['./botonpago.component.css']
})
export class BotonpagoComponent implements OnInit {

  boton: String = '<button>Pagar</button>';


  transaccion = new FormGroup({
    numeroCliente: new FormControl(),
    sourceUserId: new FormControl('', [Validators.pattern('^(\\s|\\d{11})$')]),
    cuotas: new FormControl(),
    amount: new FormControl('', [Validators.required, Validators.pattern('\\d+\\.\\d{2}')]),
    clarification: new FormControl()
  });

  submitted: Boolean = false;
  waitting: Boolean = false;

  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit() {

    this.submitted = false;
    this.waitting = false;

  }

  onSubmit() {

    this.submitted = true;
    console.log(this.transaccion.valid);

    if (this.transaccion.valid) {
      this.waitting = true;
      this.httpClient.post(
        environment.url + '/plan/boton', this.transaccion.value).subscribe(
          (data: any) => {
            this.boton = data.code;
            this.waitting = false;}
            , error => this.mostrarError(error.error)
        )
    }
    console.log(this.sourceUserId.valid);
    console.log(this.amount.valid);
  }


  mostrarError(error) {
    console.log(error);
    if (error == 'SOURCE USER INVALID') {
      this.transaccion.get("sourceUserId").setErrors({ serverError: 'No existe el CUIT ingresado.' });
    } else {
      this.transaccion.get("sourceUserId").setErrors({ serverError: error });
    }
    this.waitting = false;
  }




  onCancelar() {
    this.router.navigate(['/launcher']);

  }


  get sourceUserId() { return this.transaccion.get('sourceUserId'); }
  get amount() { return this.transaccion.get('amount'); }


}
