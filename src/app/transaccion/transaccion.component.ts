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

  currentDate: Date;

  transaccion = new FormGroup({
    numeroCliente: new FormControl(),
    sourceUserId: new FormControl('', [Validators.required, Validators.pattern('\\d{11}')]),
    externalTransactionNumber: new FormControl(''),
    cuotas: new FormControl(),
    fechaPrimerVencimiento: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required,Validators.pattern('\\d+\\.\\d{2}')]),
    clarification: new FormControl()
  });

  submitted: Boolean = false;
  waitting: Boolean = false;

  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit() {
    this.currentDate = new Date();
    this.currentDate.setTime(this.currentDate.getTime() + 1000*60*60*24*30);
    console.log(this.currentDate);
    this.submitted = false;
    this.waitting = false;
  
  }

  onSubmit() {
    console.log(this.fechaPrimerVencimiento.value);

    this.submitted = true;
    console.log(this.transaccion.valid);
    
    if (this.transaccion.valid) {
      this.waitting = true;
    this.httpClient.post(
      environment.url + '/plan/crear', this.transaccion.value).subscribe(
        data => this.router.navigate(['/transactionconfirmation']), error => this.mostrarError(error.error)
      )
    }
    console.log(this.sourceUserId.valid);
    console.log(this.fechaPrimerVencimiento.valid);
    console.log(this.amount.valid);
    console.log(this.externalTransactionNumber.valid);
  }


  mostrarError(error) {
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
  get fechaPrimerVencimiento() { return this.transaccion.get('fechaPrimerVencimiento'); }
  get amount() { return this.transaccion.get('amount'); }
  get externalTransactionNumber() { return this.transaccion.get('externalTransactionNumber'); }
  
  

}
