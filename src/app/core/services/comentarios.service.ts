import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, take } from 'rxjs';

export interface Comentario {
  _id?: string;
  calificacion: number;
  comentario: string;
  autor: string;
  fecha: string;
  idBedrooms: string;
}

const COMENTARIOS_DATA: Comentario[] = [
  { "calificacion": 5, "comentario": "Bueno", "autor": "31287638176631", "fecha": "04/08/2024", "idBedrooms": "1" },
  { "calificacion": 4, "comentario": "Bueno", "autor": "31287638176632", "fecha": "04/08/2024", "idBedrooms": "2" },
  { "calificacion": 3, "comentario": "Regular", "autor": "31287638176633", "fecha": "04/08/2024", "idBedrooms": "3" },
  { "calificacion": 2, "comentario": "Poco Bueno", "autor": "31287638176634", "fecha": "04/08/2024", "idBedrooms": "4" },
  { "calificacion": 1, "comentario": "Malo", "autor": "31287638176635", "fecha": "04/08/2024", "idBedrooms": "5" },
  { "calificacion": 5, "comentario": "Bueno", "autor": "31287638176636", "fecha": "04/08/2024", "idBedrooms": "6" },
  { "calificacion": 2, "comentario": "Poco Bueno", "autor": "31287638176637", "fecha": "04/08/2024", "idBedrooms": "7" }
]

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  private _urlComentarios = 'http://localhost:9000/api/comentarios';

  constructor(private httpClient: HttpClient) { }

  getComentarios(id:number): Promise<Comentario[]> {
    return firstValueFrom<Comentario[]>(this.httpClient.get<Comentario[]>(`${this._urlComentarios}/${id}`));
    // return Promise.resolve(COMENTARIOS_DATA);
  }

  saveComentario(comentario: Comentario): Promise<Comentario> {
    console.info(comentario)
    return firstValueFrom<Comentario>(this.httpClient.post<Comentario>(`${this._urlComentarios}`, comentario));
    // return Promise.resolve(comentario);
  }

}
