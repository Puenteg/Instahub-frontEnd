import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  menuOpen: boolean = false;
  isOnRegisterPage: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // Detectar cambios de ruta
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isOnRegisterPage = this.router.url === '/registro';
      }
    });
  }

  ngOnInit(): void {
    this.updateLoginStatus();
  }

  updateLoginStatus(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
  
  goToRegister(): void {
    this.router.navigate(['/registro']); // Redirige al usuario a la página de registro
  }

  logout(): void {
    this.authService.logout();
    this.updateLoginStatus(); // Actualiza el estado local
    this.menuOpen = false; // Cierra el menú
    this.router.navigate(['/login']); // Redirige al usuario a la página de login
  }
}
