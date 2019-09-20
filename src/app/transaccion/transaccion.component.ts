import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-transaccion',
  templateUrl: './transaccion.component.html',
  styleUrls: ['./transaccion.component.css']
})


export class TransaccionComponent implements OnInit {

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  transaccion = new FormGroup({
    numeroCliente: new FormControl(),
    sourceUserId: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    externalTransactionNumber: new FormControl('', [Validators.required]),
    cuotas: new FormControl(),
    fechaPrimerVencimiento: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required,Validators.pattern('\\d+\\.\\d{2}')]),
    descripcion: new FormControl()
  });

  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.fechaPrimerVencimiento.value);
    
    this.httpClient.post(
      environment.url + '/plan/crear', this.transaccion.value, this.httpOptions).subscribe(
        data => this.router.navigate(['']), error => this.mostrarError(error.error)
      )

  }


  mostrarError(error) {
    console.log(error);
    if (error == 'SOURCE USER INVALID') {
      this.transaccion.get("sourceUserId").setErrors({ serverError: 'No existe el CUIT ingresado.' });
    }
  }




  onCancelar() {
    this.router.navigate(['']);

  }


  get sourceUserId() { return this.transaccion.get('sourceUserId'); }
  get fechaPrimerVencimiento() { return this.transaccion.get('fechaPrimerVencimiento'); }
  get monto() { return this.transaccion.get('monto'); }
  get externalTransactionNumber() { return this.transaccion.get('externalTransactionNumber'); }
  
  

}
