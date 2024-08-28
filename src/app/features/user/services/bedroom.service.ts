import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BedroomService {
  private apiUrl = 'http://localhost:9000/api/details'; // Asegúrate de que esta URL sea la correcta

  constructor(private http: HttpClient) {}

  getBedroomDetails(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
