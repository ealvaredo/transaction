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


  transaccion = new FormGroup({
    numeroCliente: new FormControl(),
    sourceUserId: new FormControl('', [Validators.required, Validators.pattern('\\d{11}')]),
    externalTransactionNumber: new FormControl('', [Validators.required]),
    cuotas: new FormControl(),
    fechaPrimerVencimiento: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required,Validators.pattern('\\d+\\.\\d{2}')]),
    clarification: new FormControl()
  });

  submitted: Boolean = false;

  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit() {
  
    this.submitted = false;
  
  }

  onSubmit() {
    console.log(this.fechaPrimerVencimiento.value);

    this.submitted = true;
    console.log(this.transaccion.valid);
    
    if (this.transaccion.valid) {
    this.httpClient.post(
      environment.url + '/plan/crear', this.transaccion.value).subscribe(
        data => this.router.navigate(['/transactionconfirmation']), error => this.mostrarError(error.error)
      )
    }
  }


  mostrarError(error) {
    console.log(error);
    if (error == 'SOURCE USER INVALID') {
      this.transaccion.get("sourceUserId").setErrors({ serverError: 'No existe el CUIT ingresado.' });
    }
  }




  onCancelar() {
    this.router.navigate(['/launcher']);

  }


  get sourceUserId() { return this.transaccion.get('sourceUserId'); }
  get fechaPrimerVencimiento() { return this.transaccion.get('fechaPrimerVencimiento'); }
  get amount() { return this.transaccion.get('amount'); }
  get externalTransactionNumber() { return this.transaccion.get('externalTransactionNumber'); }
  
  

}
