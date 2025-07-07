import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatHint, MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatNativeDateModule, MatOption} from '@angular/material/core';
import {ProductoService} from '../../../services/producto-service';
import {ActivatedRoute, Router} from '@angular/router';
import {Producto} from '../../../model/producto';
import {Categoria} from '../../../model/categoria';
import {Tienda} from '../../../model/tienda';
import {DetalleordenService} from '../../../services/detalleorden.service';
import {Detalleorden} from '../../../model/detalleorden';
import {Orden} from '../../../model/orden';

@Component({
  selector: 'app-detalleorden-nuevo-edit-component',
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
    MatNativeDateModule, // add
    // add
  ],
  templateUrl: './detalleorden-nuevo-edit-component.html',
  styleUrl: './detalleorden-nuevo-edit-component.css'
})
export class DetalleordenNuevoEditComponent {

  detalleordenForm : FormGroup;
  fb : FormBuilder = inject(FormBuilder)
  detalleService = inject(DetalleordenService);
  router = inject(Router);
  edicion : boolean = false;
  route : ActivatedRoute = inject(ActivatedRoute);
  id: number = 0;

  constructor() {
    this.detalleordenForm = this.fb.group({
      detalleorden_id: [''],
      cantidad: ['', [Validators.required, Validators.max(99)]],
      producto_id : [''],
      orden_id : [''],
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
      this.detalleService.listId(this.id).subscribe((data:Detalleorden) => {
        console.log(data);
        this.detalleordenForm.patchValue({
          cantidad:data.cantidad,
          //id_categoria:data.id_categoria
          producto_id: data.producto_id ? data.producto_id.producto_id : null,
          orden_id: data.orden_id ? data.orden_id.orden_id : null
        });
      })
    }
  }

  onSubmit(){
    if(this.detalleordenForm.valid){
      const detalleorden : Detalleorden = new Detalleorden();
      detalleorden.detalleorden_id = this.id;

      detalleorden.cantidad = this.detalleordenForm.value.cantidad;

      const detalleProducto = new Producto();
      detalleProducto.producto_id = this.detalleordenForm.value.producto_id;
      detalleorden.producto_id = detalleProducto;

      const detalleOrDen = new Orden();
      detalleOrDen.orden_id = this.detalleordenForm.value.orden_id;
      detalleorden.orden_id = detalleOrDen;

      if(!this.edicion){
        console.log("Datos leidos del form:", detalleorden);
        this.detalleService.insert(detalleorden).subscribe((data) => {
          console.log(data);
          this.detalleService.actualizarLista();
          console.log("Lista Actualizada");
        });
      }else{
        console.log("Datos leidos del form:", detalleorden);
        this.detalleService.update(detalleorden).subscribe((data) => {
          this.detalleService.actualizarLista();
          console.log("Lista Actualizada", data);
        })
      }
      this.router.navigate(['detalles']);
    }
    else{
      console.log("Formulario no valido");
    }
  }
}
