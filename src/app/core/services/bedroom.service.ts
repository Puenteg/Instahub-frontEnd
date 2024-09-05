//PERMITE MOSTRAR EL LOGUEO DEL USUARIO ANFI
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BedroomService {
  private apiUrl = 'http://localhost:9000/api';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getBedroomDetails(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/details/${id}`);
  }

  getAllBedroomsByHost(hostId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/bedrooms/host/${hostId}`);
  }

  getLoggedInHostBedrooms(): Observable<any[]> {
    const loggedInHostId = this.authService.getLoggedInUserId();
    return this.getAllBedroomsByHost(loggedInHostId);
  }

  createBedroom(bedroomData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/bedrooms`, bedroomData);
  }

  updateBedroom(id: string, bedroomData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/bedrooms/${id}`, bedroomData);
  }

  deleteBedroom(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/bedrooms/${id}`);
  }
}
