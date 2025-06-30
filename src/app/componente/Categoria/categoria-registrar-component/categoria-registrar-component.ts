import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {CategoriaService} from '../../../services/categoria-service';
import {Router} from '@angular/router';
import {Categoria} from '../../../model/categoria';

@Component({
  selector: 'app-categoria-registrar-component',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatInput,
    MatButton
  ],
  templateUrl: './categoria-registrar-component.html',
  styleUrl: './categoria-registrar-component.css'
})
export class CategoriaRegistrarComponent {
  categoriaForm: FormGroup;
  fb = inject(FormBuilder);
  categoriaService: CategoriaService = inject(CategoriaService);
  router = inject(Router);
  lista: Categoria[] = [];
  //tipoProducto: TipoProducto = new TipoProducto();
  constructor() {
    this.categoriaForm = this.fb.group({
      idCategoria: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    })
  }
  ngOnInit(): void {
    this.categoriaService.list().subscribe({
      next: (data: Categoria[]) => {
        this.lista= data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onSubmit(): void {
    if(this.categoriaForm.valid){
      const categoria:Categoria = new Categoria();
      //categoria.idCategoria = this.categoriaForm.controls['idCategoria'].value;
      categoria.nombre = this.categoriaForm.controls['nombre'].value;
      categoria.descripcion = this.categoriaForm.controls['descripcion'].value;
      //categoria.tipoProducto.id = this.productoForm.value.tipoProducto;
      console.log("Producto a enviar:", categoria);

      this.categoriaService.insert(categoria).subscribe({
        next: (data:Object) => {
          alert("Categoria Registrada!");
          console.log(data);
          this.categoriaService.actualizarLista();
        }
      });
      this.router.navigate(['']);
    }else {
      alert("Formulario invalido!");
      console.log("Formulario invalido");
    }
  }
}
