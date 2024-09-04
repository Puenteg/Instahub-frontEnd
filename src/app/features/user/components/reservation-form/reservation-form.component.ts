import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservacionService } from '../../../../core/services/reservacion.service';
import { Reservacion } from '../../../../models/reservacion';
import { BedroomService } from '../../../../core/services/bedroom.service';

interface Bedroom {
  _id: any | string;
}

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css',
  providers: [ReservacionService]
})
export class ReservationFormComponent implements OnInit {
  titulo = 'Hacer Reservacion';
  reservacionForm: FormGroup;
  bedroom: any = {};
  bedrooms: Bedroom[] = [];

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, private _reservacionService: ReservacionService, private bedroomService: BedroomService) {
    this.reservacionForm = this.fb.group({
      fecha_ingreso: ['', Validators.required],
      fecha_termino: ['', Validators.required],
      hora_llegada: ['', Validators.required],
      hora_salida: ['', Validators.required],
      huespedes: ['', Validators.required],
      idBedrooms: [this.route.snapshot.paramMap.get('id'), Validators.required]
    });
  }
  agregarReservacion() {

    const RESERVACION: Reservacion = {
      fecha_ingreso: this.reservacionForm.get('fecha_ingreso')?.value,
      fecha_termino: this.reservacionForm.get('fecha_termino')?.value,
      hora_llegada: this.reservacionForm.get('hora_llegada')?.value,
      hora_salida: this.reservacionForm.get('hora_salida')?.value,
      huespedes: this.reservacionForm.get('huespedes')?.value,
      idBedrooms: this.reservacionForm.get('idBedrooms')?.value
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
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bedroomService.getBedroomDetails(id).subscribe(
        data => {
          this.bedroom = data;
        },
        error => {
          console.error('Error fetching bedroom details:', error);
        }
      );
    }
  }
}

