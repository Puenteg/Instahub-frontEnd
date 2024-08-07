import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReservacionService {
  url = 'http://localhost:9000/api/reservacion/';

  constructor(private http: HttpClient, private httpClient: HttpClient) { }

  createReservacion(reservacion: any): Observable<any> {
    return this.http.post(this.url, reservacion);
  }

  deleteReservacion(id: string): Observable<any> {
    return this.http.delete(this.url + id)
  }
}