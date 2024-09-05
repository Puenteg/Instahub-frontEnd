
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = 'http://54.211.225.90:9000/api/home';

  constructor(private http: HttpClient) { }

  getHomeData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/data`);
  }
}