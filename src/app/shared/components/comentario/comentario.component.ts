import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comentario, ComentariosService } from '../../../core/services/comentarios.service';

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

  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

  constructor(private comentariosService: ComentariosService) {
    this.dataComentario = null;
  }

  reportar(): void {
    if(this.dataComentario?._id) {
      this.comentariosService.reportar(this.dataComentario._id).then(
        (success) => {
          alert(success.message)
          this.refresh.emit()
        }, (error) => {
          console.error(error)
        }
      )
    }
  }

  validaComentarioAutor(): boolean {
    return true;
  }

  eliminar(): void {
    if(this.dataComentario?._id) {
      this.comentariosService.deleteComentario(this.dataComentario._id).then(
        (success) => {
          this.refresh.emit();
        }
      )
    }
  }

}
