import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export interface BedRoom {
  _id?: string;
  title: string;
  description: string;
  host: string;
  location: string;
  price: number;
  image: string;
  date: string;
  category: string;
  estatus?: string;
  criteriosARevisar?: string[];
  comentarios?: string;
}

export interface CriteriosBedRoom {
  lenguage: Criterio,
  longitud: Criterio,
  estadoHabitacion: Criterio
  capacidad: Criterio
}

export interface Criterio {
  mensaje: string;
  estatus?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  private readonly _urlService = 'http://54.211.225.90:9000/api/estatusHabitacion';

  constructor(private httpClient: HttpClient) { }

  getHabitacionesPorRevisar(): Promise<BedRoom[]> {
    return firstValueFrom<BedRoom[]>(this.httpClient.get<BedRoom[]>(`${this._urlService}/`));
  }

  updateHabitacionPorRevisar(habitacion: BedRoom): Promise<BedRoom> {
    return firstValueFrom<BedRoom>(this.httpClient.put<BedRoom>(`${this._urlService}/`, habitacion));
  }

  getDefaulCriteriosAceptacion(): CriteriosBedRoom {
    return {
      lenguage: {
        mensaje: '¿La publicación cumple con un lenguage acorde al público?',
        estatus: false,
      },
      longitud: {
        mensaje:
          '¿La publicación es lo suficiente extensa para explicar el producto, pero no lo suficiente para aburrir al lector?',
        estatus: false,
      },
      estadoHabitacion: {
        mensaje:
          '¿La habitación se encuentra en un estado habitable y confortable?',
        estatus: false,
      },
      capacidad: {
        mensaje:
          '¿La habitación cuenta con el equipamento necesario para las personas que especifica?',
        estatus: false,
      },
    };
  }

}
