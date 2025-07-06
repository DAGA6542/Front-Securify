import {Component, inject} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatInput, MatInputModule, MatLabel} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CategoriaService} from "../../services/categoria.service";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {Categoria} from "../../model/categoria";

@Component({
  selector: 'app-categoria-component',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatButton,
    MatInput,
    ReactiveFormsModule,
    MatInputModule,//add
    MatDatepickerModule, // add
    MatNativeDateModule, // add
  ],
  templateUrl: './categoria-component.html',
  styleUrl: './categoria-component.css'
})
export class CategoriaComponent {
  categoriaService = inject(CategoriaService);
  formulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      categoria_id: [null],
      nombre: ['', Validators.required],
      descripcion: ['',Validators.required],
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      alert("Ok");
      let categoria = new Categoria();
      categoria = this.formulario.value;
      console.log(categoria);
      this.categoriaService.insert(categoria).subscribe({
        next: result => {
          console.log("Categoria registrado ", result);
          alert("Categoria registrado existosamente");
          this.formulario.reset();
        },
        error: error => {
          console.log(error);
          alert("Error no se puede registrar" );
        }
      })
    } else{
      alert("Form incorrecto");
      this.formulario.markAsTouched();
    }
  }

}
