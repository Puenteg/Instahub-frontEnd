import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../enviroments/environment';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {
  rooms: any[] = [];
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService 
  ) {}

  ngOnInit(): void {
    const hostId = this.authService.getValueId(); // Obtén el ID del anfitrión

    this.http.get(`${environment.apiBaseUrl}/bedrooms?host=${hostId}`)
      .subscribe(
        (data: any) => {
          this.rooms = data;  
        },
        error => {
          this.errorMessage = 'Error al cargar las habitaciones. Inténtalo de nuevo.';
          console.error('Error al obtener las habitaciones:', error);
        }
      );
  }
}
