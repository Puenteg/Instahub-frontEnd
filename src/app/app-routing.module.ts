import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/user/components/home/home.component';
import { LoginComponent } from './features/user/components/login/login.component';
import { AuthGuard } from './auth.guard';
import { RegistroComponent } from './features/user/components/registro/registro.component';

const routes: Routes = [
  { path: 'home', component:  HomeComponent},
  { path: 'login', component:  LoginComponent },
  { path: 'registro', component: RegistroComponent },

];
// canActivate: [AuthGuard]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
