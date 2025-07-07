import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatHint, MatInput, MatInputModule, MatLabel} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatNativeDateModule, MatOption} from '@angular/material/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CategoriaService} from '../../../services/categoria-service';
import {Categoria} from '../../../model/categoria';
import {TiendaService} from '../../../services/tienda-service';
import {Tienda} from '../../../model/tienda';
import {ProductoService} from '../../../services/producto-service';
import {Producto} from '../../../model/producto';
import {User} from '../../../model/user';

@Component({
  selector: 'app-tienda-nuevo-edit-component',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatFormField,
    MatButton,
    MatHint,//add
    MatInputModule,//add
    MatDatepickerModule, // add
    MatNativeDateModule,

  ],
  templateUrl: './tienda-nuevo-edit-component.html',
  styleUrl: './tienda-nuevo-edit-component.css'
})
export class TiendaNuevoEditComponent {

  tiendaForm : FormGroup;
  fb : FormBuilder = inject(FormBuilder)
  tiendaService = inject(TiendaService);
  router = inject(Router);
  edicion : boolean = false;
  route : ActivatedRoute = inject(ActivatedRoute);
  id: number = 0;

  constructor() {
    this.tiendaForm = this.fb.group({
      tienda_id: [''],
      nombre : ['', Validators.required],
      descripcion : ['', Validators.required],
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
      this.tiendaService.listId(this.id).subscribe((data:Tienda) => {
        console.log(data);
        this.tiendaForm.patchValue({
          nombre:data.nombre,
          descripcion:data.descripcion,
          user_id: data.user_id ? data.user_id.id : null
        });
      })
    }
  }

  onSubmit(){
    if(this.tiendaForm.valid){
      const tienda : Tienda = new Tienda();
     tienda.tienda_id = this.id;

      tienda.nombre = this.tiendaForm.value.nombre;
      tienda.descripcion = this.tiendaForm.value.descripcion;

      const userTienda = new User();
      userTienda.id = this.tiendaForm.value.user_id;
      tienda.user_id = userTienda;

      if(!this.edicion){
        console.log("Datos leidos del form:", tienda);
        this.tiendaService.insert(tienda).subscribe((data) => {
          console.log(data);
          this.tiendaService.actualizarLista();
          console.log("Lista Actualizada");
        });
      }else{
        console.log("Datos leidos del form:", tienda);
        this.tiendaService.update(tienda).subscribe((data) => {
          this.tiendaService.actualizarLista();
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
