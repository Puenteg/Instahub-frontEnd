import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SidebarComponent } from './features/host/components/sidebar/sidebar.component';
import { ReservationFormComponent } from './features/user/components/reservation-form/reservation-form.component';
import { RoomDetailsComponent } from './features/user/components/room-details/room-details.component';
// import { HomeComponent } from './features/user/components/home/home.component';
import { HomeComponent} from './shared/components/home/home.component'
import { ServiceValidationComponent } from './features/admin/components/service-validation/service-validation.component';
import { RoleManagementComponent } from './features/admin/components/role-management/role-management.component';
import { RaitingDashboardComponent } from './features/admin/components/raiting-dashboard/raiting-dashboard.component';
import { RoomCrudComponent } from './features/host/components/room-crud/room-crud.component';
import { AdditionalServicesComponent } from './features/host/components/additional-services/additional-services.component';
import { ClientManagementComponent } from './features/host/components/client-management/client-management.component';
import { ReservationManagementComponent } from './features/host/components/reservation-management/reservation-management.component';
import { ComentariosComponent } from './shared/components/comentarios/comentarios.component';
import { ComentarioComponent } from './shared/components/comentario/comentario.component';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './features/user/components/login/login.component';
import { RegistroComponent } from './features/user/components/registro/registro.component';
import { ValidateTokenComponent } from './features/user/components/validate-token/validate-token.component';
import { CalificarPorEstrellaComponent } from './shared/components/calificar-por-estrella/calificar-por-estrella.component';
import { ValidationComponent } from './features/admin/components/validation/validation.component';
import { RouterModule } from '@angular/router';
import { HostHomeComponent } from './features/host/components/host-home/host-home.component';
import { RoomListComponent } from './features/host/components/room-list/room-list.component'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ReservationFormComponent,
    RoomDetailsComponent,
    HomeComponent,
    ServiceValidationComponent,
    RoleManagementComponent,
    RaitingDashboardComponent,
    RoomCrudComponent,
    AdditionalServicesComponent,
    ClientManagementComponent,
    ReservationManagementComponent,
    ComentariosComponent,
    ComentarioComponent,
    RegistroComponent,
    ValidateTokenComponent,
    CalificarPorEstrellaComponent,
    ValidationComponent,
    HostHomeComponent,
    RoomListComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  providers: [
    provideClientHydration(),
    DatePipe,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }