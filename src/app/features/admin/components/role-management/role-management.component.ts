import { Component } from '@angular/core';
import { RoleManagementService } from './role-management.service';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrl: './role-management.component.css'
})
export class RoleManagementComponent {

  tblUsuarios: any[] = [];

  constructor(private service: RoleManagementService) {
    this.getUsuarios()
  }

  getUsuarios(): void {
    this.service.getUsuarios().then(
      (success) => {
        this.tblUsuarios = success
      }
    );
  }

  cambioEstatusUsuario(evento: any, idUsuario: string): void {
    const estatus = evento.target.checked;
    console.info('Estatus: ', estatus ? 'Activo':'Bloqueado')
    this.service.updateEstatusUsuario(estatus, idUsuario).then(
      (success) => this.getUsuarios(),
      (error) => console.error(error)
    );
  }

}
