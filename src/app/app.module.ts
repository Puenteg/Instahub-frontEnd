import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './shared/componentes/login/login.component';
import { FooterComponent } from './features/user/components/footer/footer.component';
import { NavbarComponent } from './features/user/components/navbar/navbar.component';
import { SidebarComponent } from './features/host/components/sidebar/sidebar.component';
import { ReservationFormComponent } from './features/user/components/reservation-form/reservation-form.component';
import { RoomDetailsComponent } from './features/user/components/room-details/room-details.component';
import { RoomListComponent } from './features/user/components/room-list/room-list.component';
import { HomeComponent } from './features/user/components/home/home.component';
import { ServiceValidationComponent } from './features/admin/components/service-validation/service-validation.component';
import { RoleManagementComponent } from './features/admin/components/role-management/role-management.component';
import { RaitingDashboardComponent } from './features/admin/components/raiting-dashboard/raiting-dashboard.component';
import { RoomCrudComponent } from './features/host/components/room-crud/room-crud.component';
import { AdditionalServicesComponent } from './features/host/components/additional-services/additional-services.component';
import { ClientManagementComponent } from './features/host/components/client-management/client-management.component';
import { ReservationManagementComponent } from './features/host/components/reservation-management/reservation-management.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ReservationFormComponent,
    RoomDetailsComponent,
    RoomListComponent,
    HomeComponent,
    ServiceValidationComponent,
    RoleManagementComponent,
    RaitingDashboardComponent,
    RoomCrudComponent,
    AdditionalServicesComponent,
    ClientManagementComponent,
    ReservationManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
