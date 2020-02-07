import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-launcher',
  templateUrl: './launcher.component.html',
  styleUrls: ['./launcher.component.css']
})

export class LauncherComponent implements OnInit {

  planes: Object[];
  pagina = 0;
  total = 0;
  pageOne = 1;
  pageTwo = 2;
  pageThree = 3;


  buscar = new FormGroup({
    texto: new FormControl(),
    estado : new FormGroup({ 
        status : new FormControl()
    })    
  });


  constructor( private router: Router, private  httpClient: HttpClient) { }

  ngOnInit() {

    this.load();
      
    }

  load() {

    this.httpClient.get<any>(
      environment.url + '/plan/get', { params: { page: "1" }}).subscribe(
         data => this.showList(data), error => this.mostrarError(error.error)
      );
  
  }  

  showPagina(pagina: number) {

    this.httpClient.post<any>(
      environment.url + '/plan/get', { page: pagina.toString(), filtro: this.buscar.value }).subscribe(
         data => this.showList(data), error => this.mostrarError(error.error)
      );
  }


  filtrar() {

    console.log('datos ' + this.buscar.value);

    this.httpClient.post<any>(

      environment.url + '/plan/filtrar', this.buscar.value).subscribe(
         data => this.showList(data), error => this.mostrarError(error.error)
      );
  }


  showList(pagina: any) {

    this.planes = pagina.rows;
    this.pagina = pagina.pager.page;
    this.total = pagina.pager.total;

    if (this.pagina > this.pageThree) {
      this.pageOne = this.pageOne + 1;
      this.pageTwo = this.pageTwo + 1;
      this.pageThree = this.pageThree + 1;
    } else if (this.pagina < this.pageOne) {
      this.pageOne = this.pageOne  - 1;
      this.pageTwo = this.pageTwo  - 1;
      this.pageThree = this.pageThree - 1;
    }
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

   importar() {
    this.router.navigate(['/importar']);
  }


   delete(id:number) {
     console.log(id);
    this.httpClient.post<void> (
      environment.url + '/plan/delete', {id}).subscribe(
        data => this.router.navigate(['/deletetransactionconfirmation']));
 }

 mail(id:number) {
  console.log(id);
 this.httpClient.post<void> (
   environment.url + '/plan/mail', {id}).subscribe(
     data => this.router.navigate(['/mailconfirmation']));
}


 modifcarCliente(sourceUserId: number) {

  this.router.navigate(['/editarCliente', sourceUserId]);
}
 
}
