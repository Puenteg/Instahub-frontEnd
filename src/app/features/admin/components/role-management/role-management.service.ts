import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleManagementService {

  private _urlRoleManagement = 'http://54.211.225.90:9000/api/role';

  constructor(private httpClient: HttpClient) { }

  getUsuarios(): Promise<any> {
    return firstValueFrom<any[]>(this.httpClient.get<any[]>(`${this._urlRoleManagement}/usuarios`));
  }

  updateEstatusUsuario(estatus: boolean, idUsuario: string): Promise<any> {
    return firstValueFrom<any[]>(this.httpClient.put<any[]>(`${this._urlRoleManagement}/usuarios/${idUsuario}`, {estatus}));
  }

}
