import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BedRoom, ValidationService } from './validation.service';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrl: './validation.component.css',
})
export class ValidationComponent {
  tblHabitaciones: any = [];

  habitacion: BedRoom|null = null;

  criteriosAceptacion: any = null;
  formCriterios: FormGroup;

  constructor(private fb: FormBuilder, private service: ValidationService) {
    this.getHabitaciones();
    this.setDefaulCriteriosAceptacion();
    this.formCriterios = this.defaultFormCriterios();
  }

  defaultFormCriterios(): FormGroup {
    this.formCriterios = this.fb.group({
      lenguage: [false],
      longitud: [false],
      estadoHabitacion: [false],
      capacidad: [false],
      comentarios: ['']
    })
    return this.formCriterios;
  }

  setDefaulCriteriosAceptacion(): void {
    this.criteriosAceptacion = this.service.getDefaulCriteriosAceptacion();
  }

  getHabitaciones(): void {
    this.service.getHabitacionesPorRevisar().then(
      (success) => {
        this.tblHabitaciones = success
      }, (error) => console.error(error)
    );
  }

  actualizarHabitacion(habitacion: BedRoom): void {
    this.service.updateHabitacionPorRevisar(habitacion).then(
      (success) => {
        console.info('Información actualizada: ')
        console.info(success)
        this.getHabitaciones();
      }, (error) => console.error(error)
    )
  }

  verificarCriterios(): void {
    let criteriosARevisar: any[] = [];
    const isValid = Object.keys(this.formCriterios.value).reduce((a,b) => {
      if(b!== 'comentarios') {
        if(!this.formCriterios.get(b)?.value) {
          criteriosARevisar.push(b);
        }
        return a && this.formCriterios.get(b)?.value
      } else {
        return true;
      }
    }, true)
    if(this.habitacion) {
      this.habitacion.estatus = this.getEstatus(isValid);
      this.habitacion.criteriosARevisar = criteriosARevisar;
      this.habitacion.comentarios = this.formCriterios.get('comentarios')?.value
      console.info('Publicar: ', this.habitacion?.estatus)
      this.actualizarHabitacion(this.habitacion)
    }
    this.setDefaulCriteriosAceptacion();
    document.getElementById('btnCancelarModal')?.click()
  }

  getEstatus(estatus: boolean|undefined): string {
    if(estatus === undefined) {
      return 'En revisión';
    } else if (estatus) {
      return 'Aceptado'
    } else {
      return 'Rechazado'
    }
  }

  setHabitacion(bedRoom: BedRoom): void {
    this.habitacion = bedRoom;
    console.info(this.habitacion)
    this.defaultFormCriterios();
    this.formCriterios.get('comentarios')?.patchValue(this.habitacion.comentarios||'')
  }

}
