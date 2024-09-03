import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-validate-token',
  templateUrl: './validate-token.component.html',
  styleUrls: ['./validate-token.component.css']
})
export class ValidateTokenComponent {
  tokenForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.tokenForm = this.fb.group({
      token: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.tokenForm.valid) {
      const token = this.tokenForm.value.token;

      this.authService.verificarToken(token).subscribe(
        (res) => {
          if (res.isValid) {
            const rol = res.rol;
            if (rol === 'administrador') {
              this.router.navigate(['/admin']);
            } else if (rol === 'anfitrion') {
              this.router.navigate(['']);
            } else if (rol === 'usuario') {
              this.router.navigate(['']);
            }
          } else {
            this.errorMessage = 'Token no válido. Por favor, intenta de nuevo.';
          }
        },
        (error) => {
          console.error('Error al verificar el token', error);
          this.errorMessage = 'Ocurrió un error al verificar el token.';
        }
      );
    }
  }
}
