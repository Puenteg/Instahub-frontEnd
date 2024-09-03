import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { RoleManagementService } from './role-management.service';
import { AuthService } from '../../../../core/services/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrl: './role-management.component.css'
})
export class RoleManagementComponent implements AfterViewInit {

  tblUsuarios: any[] = [];

  isUsuarioCollapse: boolean = false;

  constructor(private service: RoleManagementService, private authService: AuthService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.getUsuarios()
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const usuariosCollapse = document.getElementById('usuariosCollapse')
      const habitacionesCollapse = document.getElementById('habitacionesCollapse')
      if(usuariosCollapse) {
        usuariosCollapse.addEventListener('hidden.bs.collapse', event => {
          console.info('Collapse usuarios')
          this.isUsuarioCollapse = true;
        })
      }
      if(habitacionesCollapse) {
        habitacionesCollapse.addEventListener('hidden.bs.collapse', event => {
          console.info('Collapse habitaciones')
          this.isUsuarioCollapse = false;
        })
      }
    }
  }

  getUsuarios(): void {
    this.service.getUsuarios().then(
      (success) => {
        this.tblUsuarios = success.filter((f: any) => f._id !== this.authService.getValueId())
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
