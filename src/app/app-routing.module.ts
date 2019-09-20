import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { TransaccionComponent } from './transaccion/transaccion.component';
import { LauncherComponent } from './launcher/launcher.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [

  {
    path: 'nuevoCliente',
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
    path: '',
    component: LoginComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
