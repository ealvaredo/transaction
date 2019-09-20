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

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor( private router: Router, private  httpClient: HttpClient) { }

  ngOnInit() {

    this.load();
      
    }

  load() {

    this.httpClient.get<Object[]>(
      environment.url + '/plan/get',this.httpOptions).subscribe(
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

   delete(id:number) {
     console.log(id);
    this.httpClient.post<void> (
      environment.url + '/plan/delete', id, this.httpOptions).subscribe(
        data => this.load());
 }
 
}
