import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Comentario, ComentariosService } from '../../../core/services/comentarios.service';
import { AuthService } from '../../../core/services/auth.service';
import { Observable, Subject, take } from 'rxjs';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrl: './comentarios.component.css'
})
export class ComentariosComponent implements AfterViewInit {

  constEstrellas = ['1','2','3','4','5']
  starsArray: boolean[] = new Array(5);
  $nombreUsuario = new Observable<string>();

  id: string = '';
  estadisticas: any = {
    estrella1: {cantidad: 0, porcentaje: null},
    estrella2: {cantidad: 0, porcentaje: null},
    estrella3: {cantidad: 0, porcentaje: null},
    estrella4: {cantidad: 0, porcentaje: null},
    estrella5: {cantidad: 0, porcentaje: null},
  }

  @Input() set idCasa(idCasa: string) {
    this.id = idCasa;
    this.getComentarios(idCasa)
    this.setValueDefaultForm();
  };

  comentarios: Comentario[] = [];
  formComentario: FormGroup;
  messageError: string = '';

  constructor(private comentariosService: ComentariosService, private fb: FormBuilder, private datePipe: DatePipe
    , private authService: AuthService
  ) {
    this.formComentario = this.fb.group({
      autor: [this.authService.getValueNombre()],
      calificacion: [0],
      comentario: [''],
      fecha: this.datePipe.transform(new Date(), 'dd/MM/yyyy'),
      idBedrooms: [this.id]
    });
    this.setValueDefaultForm();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      var token = this.authService.getNombre()
      if(token){
        this.$nombreUsuario = this.authService.getNombre();
        this.formComentario.get('autor')?.patchValue(this.authService.getValueNombre())
      }
    }, 500)
  }

  getComentarios(id: string): void {
    if(id) {
      this.comentariosService.getComentarios(id).then(
        (success) => {
          this.comentarios = success
        }, (error) => {
          console.error(error)
        }
      )
      this.getEstadisticas()
    }
  }

  getEstadisticas() {
    this.estadisticas = {
      estrella1: {cantidad: 0, porcentaje: null},
      estrella2: {cantidad: 0, porcentaje: null},
      estrella3: {cantidad: 0, porcentaje: null},
      estrella4: {cantidad: 0, porcentaje: null},
      estrella5: {cantidad: 0, porcentaje: null},
    }
    this.comentariosService.getEstadisticas(this.id).then(
      (success) => {
        this.estadisticas = success;
        this.obtenerEstadisticasAdicionales();
      }, (error) => {
        console.error(error)
      }
    );
  }

  setValueDefaultForm(): void {
    this.formComentario = this.fb.group({
      autor: [this.authService.getValueNombre()],
      calificacion: [0],
      comentario: [''],
      fecha: this.datePipe.transform(new Date(), 'dd/MM/yyyy'),
      idBedrooms: [this.id]
    });
  }

  enviarComentario(): void {
    if(!this.validaComentario()) {
      return
    }
    console.info(this.formComentario.value)
    this.comentariosService.saveComentario(this.formComentario?.value).then(
      (success) => {
        this.setValueDefaultForm();
        this.getComentarios(this.id)
      }, (error) => {
        console.error(error)
      }
    )
  }

  validaComentario(): boolean {
    const comentario = this.formComentario.value;
    if(comentario.comentario.trim().length === 0) {
      this.messageError = 'El comentario no puede ir vacio';
      return false;
    } else if(comentario.calificacion === 0) {
      this.messageError = 'La calificación debe ser ingresada';
      return false;
    }
    return true;
  }

  getFormat2Decimales(porcentaje: number|null): string {
    if(porcentaje) {
      const enteros = Math.trunc(porcentaje);
      const texto = `${porcentaje}`.split('.')
      if(texto.length === 2) {
        const decimales = Math.round(parseFloat(`${texto[1].substring(0, 2)}.${texto[1].substring(2, -1)}`));
        return `${enteros}.${decimales}`
      }
      return `${enteros}`;
    }
    return '0';
  }

  setCalificacion(calificacion: number) {
    this.formComentario.get('calificacion')?.patchValue(`${calificacion}`)
  }

  obtenerEstadisticasAdicionales(): void {
    let conteoPuntos = 0;
    let conteoCalificaciones = 0;
    Object.keys(this.estadisticas).forEach(cantEstrellas => {
      if(cantEstrellas.includes('estrella')) {
        const valorEstrella = parseInt(cantEstrellas.replace('estrella', ''), 10);
        conteoPuntos += valorEstrella * this.estadisticas[cantEstrellas].cantidad;
        conteoCalificaciones += this.estadisticas[cantEstrellas].cantidad;
      }
    });
    const maximoPuntos = conteoCalificaciones * 5;
    if(maximoPuntos !== 0) {
      this.estadisticas.promedio = `${(conteoPuntos * 5 / maximoPuntos)}`;
      this.estadisticas.totalCalificaciones = conteoCalificaciones;
    } else {
      this.estadisticas.promedio = `0`;
      this.estadisticas.totalCalificaciones = conteoCalificaciones;
    }
  }

}
