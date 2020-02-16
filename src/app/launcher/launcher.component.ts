import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl } from '@angular/forms';
import { saveAs } from 'file-saver';


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

descargarListado() {


  const params = new HttpParams()
    .set('texto', this.buscar.get('texto').value).append('status', this.buscar.get('estado.status').value);

  return this.httpClient.get(environment.url + '/plan/descargar',  { params, responseType: 'blob'})
  .subscribe(data => saveAs(data, "transacciones.xlsx"));
}

/**
     * Method is use to download file.
     * @param data - Array Buffer data
     * @param type - type of the document.
     */
    downLoadFile(data: Blob) {
      console.log("respuesta");
      saveAs(data, "prueba.xlsx");
      /*
      const blob = new Blob([data], { type: "application/ms-excel" });
      console.log(blob)
      const url= window.URL.createObjectURL(blob);
      console.log(url)
      window.open(url);
*/
      

      //let pwa = window.open(url);
      /*
      if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
          alert( 'Please disable your Pop-up blocker and try again.');
      }
      */
  }
 
}
