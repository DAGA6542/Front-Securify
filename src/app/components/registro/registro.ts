import {Component, inject} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registro',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatFormField,
    MatInput,
    MatButton,
    ReactiveFormsModule,
    MatLabel,
    MatCardTitle,
  ],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
  registroForm: FormGroup;
  router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmar: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      const nuevoUsuario = this.registroForm.value;
      console.log('Usuario registrado:', nuevoUsuario);
      alert('Registro exitoso');
      // Simulación:
      localStorage.setItem('rol', 'ROLE_USER');
      this.router.navigate(['/home']);
    } else {
      this.registroForm.markAllAsTouched();
      alert('Completa todos los campos correctamente');
    }
  }

}
