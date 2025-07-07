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
import {Producto} from '../../../model/producto';
import {DetalleordenService} from '../../../services/detalleorden.service';
import {OrdenService} from '../../../services/orden.service';
import {Orden} from '../../../model/orden';
import {Detalleorden} from '../../../model/detalleorden';

@Component({
  selector: 'app-detalleorden-registrar-component',
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
  templateUrl: './detalleorden-registrar-component.html',
  styleUrl: './detalleorden-registrar-component.css'
})
export class DetalleordenRegistrarComponent {

  detalleordenForm: FormGroup;
  fb = inject(FormBuilder);
  detalleordenService: DetalleordenService = inject(DetalleordenService);
  productoService: ProductoService = inject(ProductoService);
  ordenService: OrdenService = inject(OrdenService);
  router = inject(Router);
  listaProductos: Producto[] = [];
  listaOrdenes: Orden[] = [];
  //public idCategoria: number = 0;
  //categoria: Categoria = new Categoria();
  constructor() {
    this.detalleordenForm = this.fb.group({
      detalleorden_id: [''],
      cantidad: ['', [Validators.required, Validators.max(99)]],
      producto_id: ['', Validators.required],
      orden_id: ['', Validators.required],
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

    this.ordenService.list().subscribe({
      next: (data: Orden[]) => {
        this.listaOrdenes= data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onSubmit(): void {
    if(this.detalleordenForm.valid){
      const detalleorden:Detalleorden = new Detalleorden();
      //producto.idProducto = this.productoForm.controls['idProducto'].value;
      detalleorden.cantidad = this.detalleordenForm.controls['cantidad'].value;

      const productoSeleccionado = new Producto();
      productoSeleccionado.producto_id = this.detalleordenForm.value.producto_id;
      detalleorden.producto_id = productoSeleccionado;

      const ordenSeleccionada = new Orden();
      ordenSeleccionada.orden_id = this.detalleordenForm.value.orden_id;
      detalleorden.orden_id = ordenSeleccionada;

      console.log("Detalle a enviar:", detalleorden);
      this.detalleordenService.insert(detalleorden).subscribe({
        next: (data:Object) => {
          alert("Detalle Registrado!");
          console.log(data);
          this.detalleordenService.actualizarLista();
        }
      });
      this.router.navigate(['detalles']);
    }else {
      alert("Formulario invalido!");
      console.log("Formulario invalido");
    }
  }

  protected readonly Producto = Producto;
  protected readonly Orden = Orden;
}
