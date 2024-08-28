import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './shared/components/login/login.component';
import { FooterComponent } from './features/user/components/footer/footer.component';
import { NavbarComponent } from './features/user/components/navbar/navbar.component';
import { SidebarComponent } from './features/host/components/sidebar/sidebar.component';
import { ReservationFormComponent } from './features/user/components/reservation-form/reservation-form.component';
// import { BedroomDetailsComponent } from './features/user/components/room-details/room-details.component';
import { RoomDetailsComponent } from './features/user/components/room-details/room-details.component';
import { RoomListComponent } from './features/user/components/room-list/room-list.component';
import { HomeComponent } from './shared/components/home/home.component';
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
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
// import { SlickCarouselModule } from 'ngx-slick-carousel';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';



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
    ReservationManagementComponent,
    ComentariosComponent,
    ComentarioComponent,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule ,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatChipsModule,
    MatDialogModule
    
  ],
  providers: [
    provideClientHydration(),
    DatePipe,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
