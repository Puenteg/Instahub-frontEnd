import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { Reservacion } from '../../models/reservacion';
@Injectable({
  providedIn: 'root'
})
export class ReservacionService {
  url = 'http://localhost:9000/api/reservacion/';

  constructor(private http: HttpClient, private httpClient: HttpClient) { }

  guaradrReservacion(reservacion: Reservacion): Observable<any> {
    return this.http.post(this.url, reservacion);
  }

  deleteReservacion(id: string): Observable<any> {
    return this.http.delete(this.url + id)
  }
}
