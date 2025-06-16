import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatHint, MatInput, MatInputModule, MatLabel} from "@angular/material/input";
import {Producto} from '../../model/producto';
import {MatTableDataSource} from '@angular/material/table';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CategoriaService} from '../../services/categoria-service';
import {Categoria} from '../../model/categoria';

@Component({
  selector: 'app-categoria-nuevo-edit-component',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatFormField,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatButton,
    MatHint,//add
    MatInputModule,//add
    MatDatepickerModule, // add
    MatNativeDateModule,
    RouterLink,
    // add
  ],
  templateUrl: './categoria-nuevo-edit-component.html',
  styleUrl: './categoria-nuevo-edit-component.css'
})
export class CategoriaNuevoEditComponent {
  categoriaForm : FormGroup;
  fb : FormBuilder = inject(FormBuilder)
  categoriaService = inject(CategoriaService);
  router = inject(Router);
  edicion : boolean = false;
  route : ActivatedRoute = inject(ActivatedRoute);
  id: number = 0;

  constructor() {
    this.categoriaForm = this.fb.group({
      idCategoria: [''],
      nombre : ['', Validators.required],
      descripcion : ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.cargaForm();
    });

  }

  cargaForm(){
    if(this.edicion){
      this.categoriaService.listId(this.id).subscribe((data:Categoria) => {
        console.log(data);
        this.categoriaForm.patchValue({
          nombre:data.nombre,
          descripcion:data.descripcion,
        });
      })
    }
  }

  onSubmit(){
    if(this.categoriaForm.valid){
      const categoria : Categoria = new Categoria();
      categoria.idCategoria = this.id;
      categoria.nombre = this.categoriaForm.value.nombre;
      categoria.descripcion = this.categoriaForm.value.descripcion;
      if(!this.edicion){
        console.log("Datos leidos del form:", categoria);
        this.categoriaService.insert(categoria).subscribe((data) => {
          console.log(data);
          this.categoriaService.actualizarLista();
          console.log("Lista Actualizada");
        });
      }else{
        console.log("Datos leidos del form:", categoria);
        this.categoriaService.update(categoria).subscribe((data) => {
          this.categoriaService.actualizarLista();
          console.log("Lista Actualizada", data);
        })
      }
      this.router.navigate(['categorias']);
    }
    else{
      console.log("Formulario no valido");
    }
  }



}

