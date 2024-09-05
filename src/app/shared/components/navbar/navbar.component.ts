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
  isOnHostHomePage: boolean = false;
  userName: string = '';
  userRole: string = '';
  isHost: boolean = false; // Nueva propiedad

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isOnRegisterPage = this.router.url === '/registro';
        this.isOnHostHomePage = this.router.url === '/host-home';
      }
    });
  }

  ngOnInit(): void {
    this.updateLoginStatus();
    if (this.isLoggedIn) {
      this.loadUserInfo();
    }
  }

  updateLoginStatus(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  loadUserInfo(): void {
    this.userName = localStorage.getItem('nombre') || '';
    this.userRole = localStorage.getItem('rol') || '';
    this.isHost = this.userRole === 'anfitrión';
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  goToRegister(): void {
    this.router.navigate(['/registro']);
  }
  // Método para ir a host-home
  goToHostHome(): void {
    this.router.navigate(['/host-home']);
  }

  logout(): void {
    this.authService.logout();
    this.updateLoginStatus();
    this.menuOpen = false;
    this.router.navigate(['/login']);
  }

  toLogin():void {
    this.router.navigate(['/login']);
  }

}

