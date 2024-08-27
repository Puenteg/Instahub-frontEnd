import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/user/components/home/home.component';
import { LoginComponent } from './features/user/components/login/login.component';
import { RegistroComponent } from './features/user/components/registro/registro.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
{ path: '', component:  HomeComponent },
{ path: 'login', component:  LoginComponent },
{ path: 'registro', component:  RegistroComponent },
];
// canActivate: [AuthGuard]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
