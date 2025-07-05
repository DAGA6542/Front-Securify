import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {ProductoService} from '../../../services/producto-service';
import {CategoriaService} from '../../../services/categoria-service';
import {TiendaService} from '../../../services/tienda-service';
import {Router} from '@angular/router';
import {Tienda} from '../../../model/tienda';
import {Producto} from '../../../model/producto';
import {Imagenproducto} from '../../../model/imagenproducto';
import {ImagenproductoService} from '../../../services/imagenproducto-service';

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
      imagenproducto_id: [''],
      urlImagen: ['', Validators.required],
      producto_id: ['', Validators.required],
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
      productoSeleccionado.producto_id = this.imagenproductoForm.value.producto_id;
      imagenproducto.producto_id = productoSeleccionado;

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
