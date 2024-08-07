import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { RoomDetailsComponent } from './features/user/components/room-details/room-details.component';

const routes: Routes = [
  { path: '', component:  HomeComponent },
  { path: 'room-details/:id', component: RoomDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
