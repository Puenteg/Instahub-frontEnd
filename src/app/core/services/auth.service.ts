import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:9000/api/auth';

  $nombreUsuario = new BehaviorSubject('');
  $idUsuario = new BehaviorSubject('');

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  registro(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, userData);
  }

  login(correo: string, contrasena: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { correo, contrasena }).pipe(
      tap((response: any) => {
        if (response.success) {
          localStorage.setItem('token', response.token); // Guarda el token
          localStorage.setItem('rol', response.rol); // Guarda el rol si es necesario
          this.$nombreUsuario.next(response.nombre)
          this.$nombreUsuario.next(response._id)
          localStorage.setItem('nombre', response.nombre)
          localStorage.setItem('id', response._id)
        }
      })
    );
  }

  getNombre(): Observable<string> {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('nombre')) {
        this.$nombreUsuario.next(localStorage.getItem('nombre') || '');
      }
    }
    return this.$nombreUsuario.asObservable();
  }

  getValueNombre(): string {
    return this.$nombreUsuario.getValue();
  }

  getValueId(): string {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('id')) {
        this.$idUsuario.next(localStorage.getItem('id')||'')
      }
    }
    return this.$idUsuario.getValue();
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('rol');
      localStorage.removeItem('nombre');
      this.$nombreUsuario.next('');
    }
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  // Método para verificar el token y obtener el rol
  verificarToken(token: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/validar-token`, { token });
  }

  // Obtener el token desde el localStorage
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  // Guardar el token en el localStorage
  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
  }

  // Eliminar el token del localStorage (Logout)
  removeToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }
}
