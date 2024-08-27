import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { ReservacionService } from '../../../../core/services/reservacion.service';
import { subscribe } from 'diagnostics_channel';
import { error } from 'console';
import { Reservacion } from '../../../../models/reservacion';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css',
  providers: [ReservacionService]
})
export class ReservationFormComponent implements OnInit {
  titulo = 'Hacer Reservacion';
  reservacionForm: FormGroup;
  constructor(private fb: FormBuilder,
    private router: Router, private _reservacionService: ReservacionService) {
    this.reservacionForm = this.fb.group({
      fecha_ingreso: ['', Validators.required],
      fecha_termino: ['', Validators.required],
      hora_llegada: ['', Validators.required],
      hora_salida: ['', Validators.required],
      huespedes: ['', Validators.required]
    });
  }
  agregarReservacion() {
    const RESERVACION: Reservacion = {
      fecha_ingreso: this.reservacionForm.get('fecha_ingreso')?.value,
      fecha_termino: this.reservacionForm.get('fecha_termino')?.value,
      hora_llegada: this.reservacionForm.get('hora_llegada')?.value,
      hora_salida: this.reservacionForm.get('hora_salida')?.value,
      huespedes: this.reservacionForm.get('huespedes')?.value
    }
    console.log(RESERVACION);
    this._reservacionService.guaradrReservacion(RESERVACION).subscribe(data => {
      alert('Reservacion agregada con exito!');
      this.router.navigate(['/']);
    }, error => {
      console.log("Ocurrió un error :/");
      this.reservacionForm.reset();
    });

  }
  ngOnInit(): void {

  }
}

