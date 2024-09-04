import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private apiUrl = 'http://localhost:9000/api/bedrooms';

  constructor(private http: HttpClient) { }

  // Método para obtener todas las habitaciones de un anfitrión
  getAllBedroomsByHost(hostId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/host/${hostId}`);
  }

  // Método para crear una nueva habitación
  createRoom(roomData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, roomData);
  }

  // Método para eliminar una habitación por ID
  deleteBedroom(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}


// src/app/core/services/room.service.ts

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from '../../enviroments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class RoomService {
//   private apiUrl = `${environment.apiBaseUrl}/api/bedrooms`;

//   constructor(private http: HttpClient) { }

//   getAllBedroomsByHost(hostId: string): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/host/${hostId}`);
//   }

//   deleteBedroom(roomId: string): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/${roomId}`);
//   }

//   // Agrega este método
//   getHostImageUrl(hostId: string): string {
//     // Ajusta esta lógica según cómo obtengas la imagen del anfitrión
//     return `assets/host-images/${hostId}.jpg`; // Ruta a la imagen del anfitrión
//   }
// }



