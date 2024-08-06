import { Injectable } from '@angular/core';

export interface Comentario {
  calificacion: number;
  comentario: string;
  autor: string;
  fecha: string;
}

const COMENTARIOS_DATA: Comentario[] = [
  { calificacion: 5, comentario: 'Bueno', autor: 'Nombre Autor', fecha: '04/08/2024' },
  { calificacion: 4, comentario: 'Bueno', autor: 'Nombre Autor', fecha: '04/08/2024' },
  { calificacion: 3, comentario: 'Regular', autor: 'Nombre Autor', fecha: '04/08/2024' },
  { calificacion: 2, comentario: 'Poco Bueno', autor: 'Nombre Autor', fecha: '04/08/2024' },
  { calificacion: 1, comentario: 'Malo', autor: 'Nombre Autor', fecha: '04/08/2024' },
  { calificacion: 5, comentario: 'Bueno', autor: 'Nombre Autor', fecha: '04/08/2024' },
  { calificacion: 2, comentario: 'Poco Bueno', autor: 'Nombre Autor', fecha: '04/08/2024' },
]

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  constructor() { }

  getComentarios(): Promise<Comentario[]> {
    return Promise.resolve(COMENTARIOS_DATA);
  }

}
