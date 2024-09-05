import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-home-host',
  templateUrl: './host-home.component.html',
  styleUrls: ['./host-home.component.css']
})
export class HostHomeComponent implements OnInit {
  userName: string = '';
  userRole: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') { // Asegurarse de que el código se ejecute solo en el lado del cliente
      this.loadUserInfo();
    }
  }

  loadUserInfo(): void {
    this.userName = localStorage.getItem('nombre') || 'Usuario';
    this.userRole = localStorage.getItem('rol') || 'Invitado';
  }
}
