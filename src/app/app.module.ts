import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { TransaccionComponent } from './transaccion/transaccion.component';
import { LauncherComponent } from './launcher/launcher.component';
import { Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { BasicAuthHtppInterceptorService } from './service/basic-auth-htpp-interceptor-service.service';
import { UserconfirmationComponent } from './userconfirmation/userconfirmation.component';
import { TransactionconfirmationComponent } from './transactionconfirmation/transactionconfirmation.component';
import { TransactiondeleteconfirmationComponent } from './transactiondeleteconfirmation/transactiondeleteconfirmation.component';
import { BotonpagoComponent } from './botonpago/botonpago.component';
import { StatusPipe } from './pipe/StatusPipe';




@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    TransaccionComponent,
    LauncherComponent,
    LoginComponent,
    UserconfirmationComponent,
    TransactionconfirmationComponent,
    TransactiondeleteconfirmationComponent,
    BotonpagoComponent, 
    StatusPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthHtppInterceptorService,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
