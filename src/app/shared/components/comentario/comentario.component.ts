import { Component, Input } from '@angular/core';
import { Comentario } from '../../../core/services/comentarios.service';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrl: './comentario.component.css'
})
export class ComentarioComponent {

  dataComentario: Comentario|null;

  @Input() set comentario(comentario: Comentario) {
    this.dataComentario = comentario;
  }

  constructor() {
    this.dataComentario = null;
  }


}
