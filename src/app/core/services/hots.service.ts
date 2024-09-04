import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HostService {
  private apiUrl = 'http://localhost:3000/api/host-info'; // Asegúrate de usar la URL correcta

  constructor(private http: HttpClient) {}

  getHostInfo(): Observable<any> {
    return this.http.get<any>(this.apiUrl, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
  }
}
