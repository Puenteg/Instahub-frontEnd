import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from 'express';
import { ReservacionService } from '../../../../core/services/reservacion.service';
import { ActivatedRoute } from '@angular/router';
import { take} from 'rxjs';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent {
  reservacionForm: FormGroup;
  id: string | null;
  titulo = 'Hacer Reservacion';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _reservacionService: ReservacionService,
    private aRouter: ActivatedRoute
  ) {
    this.reservacionForm = this.fb.group({
      fecha_ingreso: [''],
      fecha_termino: [''],
      hora_llegada: [''],
      hora_salida: [''],
      huespedes: [''],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  createReservacion() {
    const formData = new FormData();
    formData.append('fecha_ingreso', this.reservacionForm.get('fecha_ingreso')?.value)
    formData.append('fecha_termino', this.reservacionForm.get('fecha_termino')?.value)
    formData.append('hora_llegada', this.reservacionForm.get('hora_llegada')?.value)
    formData.append('hora_salida', this.reservacionForm.get('hora_salida')?.value)
    formData.append('huespedes', this.reservacionForm.get('huespedes')?.value)
    if ('Edit Rutina' === this.titulo) {
      if (this.id != null) {
        this._reservacionService.deleteReservacion(this.id).subscribe(data => {
          alert('Reservación eliminada con exito!');
          this.reservacionForm.reset();
        }, error => {
          alert(error);
        })
      }
    } else {
      this._reservacionService.createReservacion(formData).subscribe(data => {
        alert('Reservacion agregada con exito!');
      }, error => {
        this.reservacionForm.reset();
        alert(error);
      })
    }
  }
}