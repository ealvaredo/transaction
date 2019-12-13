import { Component, OnInit } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { saveAs } from 'file-saver';

// const URL = '/api/';
//const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-importacion',
  templateUrl: './importacion.component.html',
  styleUrls: ['./importacion.component.css']
})
export class ImportacionComponent implements OnInit {

  uploader:FileUploader;
  hasBaseDropZoneOver:boolean;
  hasAnotherDropZoneOver:boolean;
  response:string;
  constructor() { 

    this.uploader = new FileUploader({
      url: environment.url + "/upload/file",authToken :  sessionStorage.getItem('token'), 
      /*
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item) => {
        return new Promise( (resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
        
      }*/
    });
 
    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;
 
    this.response = '';
    this.uploader.onBeforeUploadItem = (item: FileItem) => {
      item._xhr.responseType = "blob";
      this.response = '';
      }

      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers:any)=>  {
        this.downLoadFile(response, "application/ms-excel")    };   
    
    this.uploader.response.subscribe( res => this.response = "Verificar los resultados en el archivo que de descargó.");
  }

  /**
     * Method is use to download file.
     * @param data - Array Buffer data
     * @param type - type of the document.
     */
    downLoadFile(data: any, type: string) {
      this.response = "Verificar los resultados en el archivo que de descargó."
      console.log("respuesta")
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

  ngOnInit() {
  }

}
