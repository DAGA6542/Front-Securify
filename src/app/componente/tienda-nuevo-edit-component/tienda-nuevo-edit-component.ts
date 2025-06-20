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
import {MatNativeDateModule} from '@angular/material/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CategoriaService} from '../../services/categoria-service';
import {Categoria} from '../../model/categoria';
import {TiendaService} from '../../services/tienda-service';
import {Tienda} from '../../model/tienda';

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
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatButton,
    MatHint,//add
    MatInputModule,//add
    MatDatepickerModule, // add
    MatNativeDateModule,
    RouterLink
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
      idTienda: [''],
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
      this.tiendaService.listId(this.id).subscribe((data:Tienda) => {
        console.log(data);
        this.tiendaForm.patchValue({
          nombre:data.nombre,
          descripcion:data.descripcion,
        });
      })
    }
  }

  onSubmit(){
    if(this.tiendaForm.valid){
      const tienda : Tienda = new Tienda();
      tienda.idTienda = this.id;
      tienda.nombre = this.tiendaForm.value.nombre;
      tienda.descripcion = this.tiendaForm.value.descripcion;
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
      this.router.navigate(['categorias']);
    }
    else{
      console.log("Formulario no valido");
    }
  }
}
