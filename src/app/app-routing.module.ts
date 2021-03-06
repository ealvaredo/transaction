import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { TransaccionComponent } from './transaccion/transaccion.component';
import { LauncherComponent } from './launcher/launcher.component';
import { LoginComponent } from './login/login.component';
import { UserconfirmationComponent } from './userconfirmation/userconfirmation.component';
import { TransactionconfirmationComponent } from './transactionconfirmation/transactionconfirmation.component';
import { TransactiondeleteconfirmationComponent } from './transactiondeleteconfirmation/transactiondeleteconfirmation.component';
import { BotonpagoComponent } from './botonpago/botonpago.component';
import { ImportacionComponent } from './importacion/importacion.component';
import { MailconfirmationComponent } from './mailconfirmation/mailconfirmation.component';


const routes: Routes = [

  {
    path: 'botonPago',
    component: BotonpagoComponent
  },
  {
    path: 'nuevoCliente',
    component: UserComponent
  },
  {
    path: 'editarCliente/:id',
    component: UserComponent
  },
  {
    path: 'nuevaTransaccion',
    component: TransaccionComponent
  },

  {
    path: 'launcher',
    component: LauncherComponent
  },
  {
    path: 'usuarioconfirmacion',
    component: UserconfirmationComponent
  },
  {
    path: 'transactionconfirmation',
    component: TransactionconfirmationComponent
  },
  {
    path: 'deletetransactionconfirmation',
    component: TransactiondeleteconfirmationComponent
  },
  {
    path: 'importar',
    component: ImportacionComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'mailconfirmation',
    component: MailconfirmationComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
