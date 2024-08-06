import { Component, Input } from '@angular/core';
import { Comentario } from '../../../core/services/comentarios.service';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrl: './comentario.component.css'
})
export class ComentarioComponent {

  @Input() comentario: Comentario;

  constructor() {
    this.comentario = {calificacion: 0, comentario: '', autor: '', fecha: '' };
  }


}
