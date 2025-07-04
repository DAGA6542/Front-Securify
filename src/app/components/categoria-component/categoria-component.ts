import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatButton} from '@angular/material/button';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {ActivatedRoute} from '@angular/router';
import {CategoriaService} from '../../services/categoria.service';
import {Categoria} from '../../model/categoria';


@Component({
  selector: 'app-categoria-component',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatLabel,
    MatButton,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './categoria-component.html',
  styleUrl: './categoria-component.css'
})
export class CategoriaComponent {
  formulario: FormGroup;
  categoriaService = inject(CategoriaService);
  route = inject(ActivatedRoute);
  esEditar = false;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      categoria_id: [null],
      nombre: [null, Validators.required],
      descripcion: [null, Validators.required],
    });
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.esEditar = true;
        this.categoriaService.list().subscribe((data: Categoria[]) => {
          const categoria = data.find((c: Categoria) => c.categoria_id == +id);
          if (categoria) {
            this.formulario.patchValue(categoria);
          }
        });
      }
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      const categoria = this.formulario.value;

      if (this.esEditar) {
        this.categoriaService.update(categoria).subscribe({
          next: () => {
            alert("Se actualizo exitosamente");
            this.formulario.reset();
            this.esEditar = false;
          },
          error: () => alert("Error al actualizar")
        });
      } else {
        this.categoriaService.insert(categoria).subscribe({
          next: () => {
            alert("Se registro exitosamente");
            this.formulario.reset();
          },
          error: () => alert("Error al registrar")
        });
      }
    } else {
      alert("Formulario inválido");
      this.formulario.markAsTouched();
    }
  }

}
