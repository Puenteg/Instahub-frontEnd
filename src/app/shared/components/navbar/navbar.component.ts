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
  userName: string = '';
  userRole: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isOnRegisterPage = this.router.url === '/registro';
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
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  goToRegister(): void {
    this.router.navigate(['/registro']);
  }

  logout(): void {
    this.authService.logout();
    this.updateLoginStatus();
    this.menuOpen = false;
    this.router.navigate(['/login']);
  }
}
