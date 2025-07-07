import {Component, inject} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {MatButton} from '@angular/material/button';
import {ProductoService} from '../../../services/producto-service';
import {Router} from '@angular/router';
import {CategoriaService} from '../../../services/categoria-service';
import {CategoriaRegistrarComponent} from '../../Categoria/categoria-registrar-component/categoria-registrar-component';
import {Categoria} from '../../../model/categoria';
import {Producto} from '../../../model/producto';
import {Tienda} from '../../../model/tienda';
import {TiendaService} from '../../../services/tienda-service';

@Component({
  selector: 'app-producto-registrar-component',
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
  templateUrl: './producto-registrar-component.html',
  styleUrl: './producto-registrar-component.css'
})
export class ProductoRegistrarComponent {

  productoForm: FormGroup;
  fb = inject(FormBuilder);
  productoService: ProductoService = inject(ProductoService);
  categoriaService: CategoriaService = inject(CategoriaService);
  tiendaService: TiendaService = inject(TiendaService);
  router = inject(Router);
  listaCategorias: Categoria[] = [];
  listaTiendas: Tienda[] = [];
  //public idCategoria: number = 0;
  //categoria: Categoria = new Categoria();
  constructor() {
    this.productoForm = this.fb.group({
      producto_id: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required],
      categoria_id: ['', Validators.required],
      tienda_id: ['', Validators.required],
    })
  }
  ngOnInit(): void {
    this.categoriaService.list().subscribe({
      next: (data: Categoria[]) => {
        this.listaCategorias= data;
      },

      error: (error) => {
        console.log(error);
      }
    })

    this.tiendaService.list().subscribe({
      next: (data: Tienda[]) => {
        this.listaTiendas= data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onSubmit(): void {
    if(this.productoForm.valid){
      const producto:Producto = new Producto();
      //producto.idProducto = this.productoForm.controls['idProducto'].value;
      producto.nombre = this.productoForm.controls['nombre'].value;
      producto.descripcion = this.productoForm.controls['descripcion'].value;
      producto.precio = this.productoForm.controls['precio'].value;
      producto.stock = this.productoForm.value.stock;

      const categoriaSeleccionada = new Categoria();
      categoriaSeleccionada.categoria_id = this.productoForm.value.categoria_id;
      producto.categoria_id = categoriaSeleccionada;

      const tiendaSeleccionada = new Tienda();
      tiendaSeleccionada.tienda_id = this.productoForm.value.tienda_id;
      producto.tienda_id = tiendaSeleccionada;

      console.log("Producto a enviar:", producto);
      this.productoService.insert(producto).subscribe({
        next: (data:Object) => {
          alert("Producto Registrado!");
          console.log(data);
          this.productoService.actualizarLista();
        }
      });
      this.router.navigate(['productos']);
    }else {
      alert("Formulario invalido!");
      console.log("Formulario invalido");
    }
  }

  protected readonly Categoria = Categoria;
  protected readonly Tienda = Tienda;
}
