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
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {TiendaService} from '../../../services/tienda-service';
import {Tienda} from '../../../model/tienda';
import {User} from '../../../model/user';
import {OrdenService} from '../../../services/orden.service';
import {Orden} from '../../../model/orden';
import {MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-orden-nuevo-edit-component',
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
    MatOption,
    MatSelect,
  ],
  templateUrl: './orden-nuevo-edit-component.html',
  styleUrl: './orden-nuevo-edit-component.css'
})
export class OrdenNuevoEditComponent {

  ordenForm : FormGroup;
  fb : FormBuilder = inject(FormBuilder)
  ordenService = inject(OrdenService);
  router = inject(Router);
  edicion : boolean = false;
  route : ActivatedRoute = inject(ActivatedRoute);
  id: number = 0;

  estadoSeleccionado: string[] = [
    "Terminado",
    "En proceso",
    "Cancelado"
  ];

  constructor() {
    this.ordenForm = this.fb.group({
      orden_id: [''],
      fecha : ['', Validators.required],
      estado : ['', Validators.required],
      user_id : [''],
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
      this.ordenService.listId(this.id).subscribe((data:Orden) => {
        console.log(data);
        this.ordenForm.patchValue({
          fecha:data.fecha,
          estado:data.estado,
          user_id: data.user_id ? data.user_id.user_id : null
        });
      })
    }
  }

  onSubmit(){
    if(this.ordenForm.valid){
      const orden : Orden = new Orden();
      orden.orden_id = this.id;

      orden.fecha = this.ordenForm.value.fecha;
      orden.estado = this.ordenForm.value.estado;

      const userOrden = new User();
      userOrden.user_id = this.ordenForm.value.user_id;
      orden.user_id = userOrden;

      if(!this.edicion){
        console.log("Datos leidos del form:", orden);
        this.ordenService.insert(orden).subscribe((data) => {
          console.log(data);
          this.ordenService.actualizarLista();
          console.log("Lista Actualizada");
        });
      }else{
        console.log("Datos leidos del form:", orden);
        this.ordenService.update(orden).subscribe((data) => {
          this.ordenService.actualizarLista();
          console.log("Lista Actualizada", data);
        })
      }
      this.router.navigate(['tiendas']);
    }
    else{
      console.log("Formulario no valido");
    }
  }
}
