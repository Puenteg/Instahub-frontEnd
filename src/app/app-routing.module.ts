import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { RoomDetailsComponent } from './features/user/components/room-details/room-details.component';
import { ReservationFormComponent } from './features/user/components/reservation-form/reservation-form.component';
import { LoginComponent } from './features/user/components/login/login.component';
import { RegistroComponent } from './features/user/components/registro/registro.component';
import { AuthGuard } from './auth.guard';
import { ValidateTokenComponent } from './features/user/components/validate-token/validate-token.component';
import { RoleManagementComponent } from './features/admin/components/role-management/role-management.component';


const routes: Routes = [
  { path: '', component:  HomeComponent },
  { path: 'login', component:  LoginComponent },
  { path: 'registro', component:  RegistroComponent },
  { path: 'token', component:  ValidateTokenComponent },
  { path: 'admin', component:  RoleManagementComponent },
  { path: 'room-details/:id', component: RoomDetailsComponent },
  { path: 'reservation', component: ReservationFormComponent },

];

// canActivate: [AuthGuard]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
