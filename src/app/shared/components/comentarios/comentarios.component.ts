import { Component } from '@angular/core';
import { Comentario, ComentariosService } from '../../../core/services/comentarios.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrl: './comentarios.component.css'
})
export class ComentariosComponent {

  comentarios: Comentario[] = [];
  formComentario: FormGroup;

  constructor(private comentariosService: ComentariosService, private fb: FormBuilder, private datePipe: DatePipe) {
   comentariosService.getComentarios().then(
      (succees) => {
        this.comentarios = succees;
      }, (error) => {
        this.comentarios = [];
      }
    );
    this.formComentario = this.fb.group({
      autor: [],
      calificacion: [],
      comentario: [],
      fecha: this.datePipe.transform(new Date(), 'dd/MM/yyyy')
    });
    this.setValueDefaultForm();
  }

  setValueDefaultForm(): void {
    this.formComentario = this.fb.group({
      autor: [],
      calificacion: [],
      comentario: [],
      fecha: this.datePipe.transform(new Date(), 'dd/MM/yyyy')
    });
  }

  enviarComentario(): void {
    this.comentarios.push(this.formComentario?.value)
    this.setValueDefaultForm();
  }

}
