import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.validateForm()) {
      this.authService.login(this.email, this.password).subscribe(
        (response: any) => {
          if (response.success) {
            const token = response.token;  // Suponiendo que el token viene en la respuesta
            this.authService.setToken(token);  // Guardar el token en el localStorage

            // Redirigir al usuario a la pantalla de validación de token
            this.router.navigate(['/token']);
          } else {
            this.errorMessage = response.msg || 'Error en el inicio de sesión';
          }
        },
        (error) => {
          console.error('Error en el inicio de sesión', error);
          if (error.status === 0) {
            this.errorMessage = 'No se pudo conectar al servidor. Por favor, verifica que el servidor esté en funcionamiento.';
          } else {
            this.errorMessage = error.error?.msg || 'Ocurrió un error inesperado';
          }
        }
      );
    }
  }

  validateForm(): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Por favor, ingresa un correo electrónico válido.';
      return false;
    }

    if (!passwordRegex.test(this.password)) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres, incluyendo una minúscula, una mayúscula y un número.';
      return false;
    }

    this.errorMessage = '';
    return true;
  }
}
