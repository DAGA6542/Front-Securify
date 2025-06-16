import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatHint, MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatButton} from '@angular/material/button';
import {MatNativeDateModule, MatOption} from '@angular/material/core';
import {ProductoService} from '../../services/producto-service';
import {ActivatedRoute, Router} from '@angular/router';
import {Producto} from '../../model/producto';

@Component({
  selector: 'app-producto-nuevo-edit-component',
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
    MatOption,
    // add
  ],
  templateUrl: './producto-nuevo-edit-component.html',
  styleUrl: './producto-nuevo-edit-component.css'
})
export class ProductoNuevoEditComponent {
  productoForm : FormGroup;
  fb : FormBuilder = inject(FormBuilder)
  productoService = inject(ProductoService);
  router = inject(Router);
  edicion : boolean = false;
  route : ActivatedRoute = inject(ActivatedRoute);
  id: number = 0;

  constructor() {
    this.productoForm = this.fb.group({
      idProducto: [''],
      nombre : ['', Validators.required],
      descripcion : ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required],
      id_categoria : ['', [Validators.required]],
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
      this.productoService.listId(this.id).subscribe((data:Producto) => {
        console.log(data);
        this.productoForm.patchValue({
          nombre:data.nombre,
          descripcion:data.descripcion,
          precio:data.precio,
          stock:data.stock,
          id_categoria:data.id_categoria
        });
      })
    }
  }

  onSubmit(){
    if(this.productoForm.valid){
      const producto : Producto = new Producto();
      producto.idProducto = this.id;
      producto.nombre = this.productoForm.value.nombre;
      producto.precio = this.productoForm.value.precio;
      producto.descripcion = this.productoForm.value.descripcion;
      producto.stock = this.productoForm.value.stock;
      producto.id_categoria = this.productoForm.value.id_categoria;
      if(!this.edicion){
        console.log("Datos leidos del form:", producto);
        this.productoService.insert(producto).subscribe((data) => {
          console.log(data);
          this.productoService.actualizarLista();
          console.log("Lista Actualizada");
        });
      }
      this.router.navigate(['productos']);
    }
    else{
      console.log("Formulario no valido");
    }
  }
}

