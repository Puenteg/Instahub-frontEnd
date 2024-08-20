import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  menuOpen: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

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
