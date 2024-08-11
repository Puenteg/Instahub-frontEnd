import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Comentario, ComentariosService } from '../../../core/services/comentarios.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { error } from 'node:console';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrl: './comentarios.component.css'
})
export class ComentariosComponent {

  id: number = 0;

  @Input() set idCasa(idCasa: number) {
    this.id = idCasa;
    this.getComentarios(idCasa)
    this.setValueDefaultForm();
  };

  comentarios: Comentario[] = [];
  formComentario: FormGroup;

  constructor(private comentariosService: ComentariosService, private fb: FormBuilder, private datePipe: DatePipe) {
    this.formComentario = this.fb.group({
      autor: ['login.service.autor.nombre'],
      calificacion: [],
      comentario: [],
      fecha: this.datePipe.transform(new Date(), 'dd/MM/yyyy'),
      idBedrooms: [this.id]
    });
    this.setValueDefaultForm();
  }

  getComentarios(id: number): void {
    if(id !==0 ) {
      this.comentariosService.getComentarios(id).then(
        (success) => {
          this.comentarios = success
        }, (error) => {
          console.error(error)
        }
      )
    }
  }

  setValueDefaultForm(): void {
    this.formComentario = this.fb.group({
      autor: ['login.service.autor.nombre'],
      calificacion: [],
      comentario: [],
      fecha: this.datePipe.transform(new Date(), 'dd/MM/yyyy'),
      idBedrooms: [this.id]
    });
  }

  enviarComentario(): void {
    this.comentariosService.saveComentario(this.formComentario?.value).then(
      (success) => {
        this.setValueDefaultForm();
        this.getComentarios(this.id)
      }, (error) => {
        console.error(error)
      }
    )
  }

}
