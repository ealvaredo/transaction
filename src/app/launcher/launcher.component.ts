import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-launcher',
  templateUrl: './launcher.component.html',
  styleUrls: ['./launcher.component.css']
})

export class LauncherComponent implements OnInit {

  planes: Object[];


  constructor( private router: Router, private  httpClient: HttpClient) { }

  ngOnInit() {

    this.load();
      
    }

  load() {

    this.httpClient.get<Object[]>(
      environment.url + '/plan/get').subscribe(
        data => this.planes = data, error => this.mostrarError(error.error)
      );
  
  }  
  

  mostrarError(error) {
    console.log(error);
  }  

  nuevoCliente() {
   this.router.navigate(['/nuevoCliente']);
  }

  nuevaTransaccion() {
    this.router.navigate(['/nuevaTransaccion']);
   }

   botonPago() {
     this.router.navigate(['/botonPago']);
   }

   delete(id:number) {
     console.log(id);
    this.httpClient.post<void> (
      environment.url + '/plan/delete', {id}).subscribe(
        data => this.router.navigate(['/deletetransactionconfirmation']));
 }
 
}
