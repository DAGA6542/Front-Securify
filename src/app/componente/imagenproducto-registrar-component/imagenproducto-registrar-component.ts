import {Component, inject} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {MatButton} from '@angular/material/button';
import {ImagenproductoService} from '../../services/imagenproducto-service';
import {ProductoService} from '../../services/producto-service';
import {Router} from '@angular/router';
import {Producto} from '../../model/producto';
import {Imagenproducto} from '../../model/imagenproducto';


@Component({
  selector: 'app-imagenproducto-registrar-component',
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
  templateUrl: './imagenproducto-registrar-component.html',
  styleUrl: './imagenproducto-registrar-component.css'
})
export class ImagenproductoRegistrarComponent {

  imagenproductoForm: FormGroup;
  fb = inject(FormBuilder);
  imagenproductoService: ImagenproductoService = inject(ImagenproductoService);
  productoService: ProductoService = inject(ProductoService);
  router = inject(Router);
  listaProductos: Producto[] = [];
  //public idCategoria: number = 0;
  //categoria: Categoria = new Categoria();
  constructor() {
    this.imagenproductoForm = this.fb.group({
      idImagenProducto: [''],
      urlImagen: ['', Validators.required],
      id_producto: ['', Validators.required],
    })
  }
  ngOnInit(): void {
    this.productoService.list().subscribe({
      next: (data: Producto[]) => {
        this.listaProductos= data;
      },

      error: (error) => {
        console.log(error);
      }
    })

  }

  onSubmit(): void {
    if(this.imagenproductoForm.valid){
      const imagenproducto:Imagenproducto = new Imagenproducto();
      //producto.idProducto = this.productoForm.controls['idProducto'].value;
      imagenproducto.urlImagen = this.imagenproductoForm.controls['urlImagen'].value;

      const productoSeleccionado = new Producto();
      productoSeleccionado.idProducto = this.imagenproductoForm.value.id_producto;
      imagenproducto.id_producto = productoSeleccionado;

      console.log("Imagen de producto a enviar:", imagenproducto);
      this.imagenproductoService.insert(imagenproducto).subscribe({
        next: (data:Object) => {
          alert("Imagen de producto Registrada!");
          console.log(data);
          this.imagenproductoService.actualizarLista();
        }
      });
      this.router.navigate(['productos']);
    }else {
      alert("Formulario invalido!");
      console.log("Formulario invalido");
    }
  }

  protected readonly Producto = Producto;
}
