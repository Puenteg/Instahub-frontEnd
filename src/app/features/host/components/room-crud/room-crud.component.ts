import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../enviroments/environment';

@Component({
  selector: 'app-room-crud',
  templateUrl: './room-crud.component.html',
  styleUrls: ['./room-crud.component.css']
})
export class RoomCrudComponent implements OnInit {
  roomForm: FormGroup;
  services: string[] = [
    'Completo: Baño, Cocina, Estufa, WIFI, TV, Estacionamiento, Cosas de baño, Cafetera, Tratos de cocina y Microondas',
    'Servicio basico: Baño, Cosas de baño, Wifi, Cocina (estufa y gas) y microondas.',
    'Servicio indispensable: Baño, WIFI, Cosas de baño, Toallas y microondas.'
  ]; // Lista de servicios
  categories: string[] = [
    'Albercas increíbles', 'Populares', 'Extraordinarias', 'Frente a la playa', 'Casas de campo', 'Icónicos', 'Habitaciones',
    'Cabañas', 'Vista increíble', 'Mansiones'
  ]; // Lista de categorías
  successMessage: string = ''; // Mensaje de éxito
  errorMessage: string = ''; // Mensaje de error

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.roomForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      fullDescription: [''],
      host: ['', Validators.required],
      price: [0, Validators.required],
      service: ['', Validators.required], // Solo se permite un servicio
      category: ['', Validators.required],
      location: ['', Validators.required],
      image: [''] // URL de la imagen
    });
  }

  ngOnInit(): void {
    // Elimina las llamadas a getCategories y getServices ya que las listas están definidas localmente
  }

  onSubmit(): void {
    if (this.roomForm.valid) {
      this.http.post(`${environment.apiBaseUrl}/bedrooms`, this.roomForm.value)
        .subscribe(response => {
          this.successMessage = '¡Habitación creada con éxito!';
          this.errorMessage = ''; // Limpiar el mensaje de error si la solicitud es exitosa
          this.roomForm.reset(); // Limpiar los campos del formulario
          console.log('Bedroom created:', response);
        }, error => {
          this.errorMessage = 'Error al crear la habitación. Inténtalo de nuevo más tarde.';
          this.successMessage = ''; // Limpiar el mensaje de éxito si hay un error
          console.error('Error creating bedroom:', error);
        });
    }
  }
}
