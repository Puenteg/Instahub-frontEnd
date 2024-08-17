import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationFormComponent } from './features/user/components/reservation-form/reservation-form.component';
import { HomeComponent } from './shared/components/home/home.component';

const routes: Routes = [
  { path: '', component:  HomeComponent },
  {path: 'app-reservation-form', component: ReservationFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
