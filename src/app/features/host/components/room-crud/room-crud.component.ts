//DEJAR AUTOMATICO EL ANFITRION
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../enviroments/environment';
import { AuthService } from '../../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';

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
  ]; 
  categories: string[] = [
    'Albercas increíbles', 'Populares', 'Extraordinarias', 'Frente a la playa', 'Casas de campo', 'Icónicos', 'Habitaciones',
    'Cabañas', 'Vista increíble', 'Mansiones'
  ]; 
  successMessage: string = ''; 
  errorMessage: string = ''; 

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService 
  ) {
    this.roomForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      fullDescription: [''],
      host: ['', Validators.required], 
      price: [0, Validators.required],
      service: ['', Validators.required], 
      category: ['', Validators.required],
      location: ['', Validators.required],
      image: [''] 
    });
  }
  //registra el usuario con nombre 
    // ngOnInit(): void {
    //   // Obtener el nombre del usuario autenticado y establecerlo en el formulario
    //   const userName = this.authService.getUserName();
    //   if (userName) {
    //     this.roomForm.get('host')?.setValue(userName);  // Establecer el nombre del anfitrión
    //   } else {
    //     this.errorMessage = 'Error al obtener el nombre del anfitrión. Por favor, intenta de nuevo.';
    //   }
    // }
  ngOnInit(): void {
      // Obtener el nombre del usuario autenticado y establecerlo en el formulario
      const idHost = this.authService.getValueId();
      if (idHost) {
        this.roomForm.get('host')?.setValue(idHost);  // Establecer el nombre del anfitrión
      } else {
        this.errorMessage = 'Error al obtener el nombre del anfitrión. Por favor, intenta de nuevo.';
      }
  }

  onSubmit(): void {
    if (this.roomForm.valid) {
      this.http.post(`${environment.apiBaseUrl}/bedrooms`, this.roomForm.value)
        .subscribe(response => {
          this.successMessage = '¡Habitación creada con éxito!';
          this.errorMessage = ''; 
          this.roomForm.reset();
          console.log('Habitación creada:', response);
        }, error => {
          this.errorMessage = 'Error al crear la habitación. Inténtalo de nuevo.';
          this.successMessage = ''; 
          console.error('Error creando la habitación:', error);
        });
    }
  }

  onLoader(event: any): void {
    const file = event.srcElement.files[0];
    console.log(file);
    let reader = new FileReader();
    reader.onload = () => {
        const base64String: string = `${reader.result}`
              .replace('data:', '')
              .replace(/^.+,/, '');
        this.roomForm.get('image')?.patchValue(`${reader.result}`);
    };
    reader.onerror = function() {
        console.log('there are some problems');
    };

    // reader.readAsArrayBuffer(file);
    reader.readAsDataURL(file);
}

}
