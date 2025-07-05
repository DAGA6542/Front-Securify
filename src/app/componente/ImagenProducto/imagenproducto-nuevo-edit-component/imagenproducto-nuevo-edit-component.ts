import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatHint, MatInput, MatInputModule, MatLabel} from "@angular/material/input";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {ProductoService} from '../../../services/producto-service';
import {ActivatedRoute, Router} from '@angular/router';
import {Producto} from '../../../model/producto';
import {Categoria} from '../../../model/categoria';
import {Tienda} from '../../../model/tienda';
import {ImagenproductoService} from '../../../services/imagenproducto-service';
import {Imagenproducto} from '../../../model/imagenproducto';

@Component({
  selector: 'app-imagenproducto-nuevo-edit-component',
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
    ],
  templateUrl: './imagenproducto-nuevo-edit-component.html',
  styleUrl: './imagenproducto-nuevo-edit-component.css'
})
export class ImagenproductoNuevoEditComponent {

  imagenproductoForm : FormGroup;
  fb : FormBuilder = inject(FormBuilder)
  imagenproductoService = inject(ImagenproductoService);
  router = inject(Router);
  edicion : boolean = false;
  route : ActivatedRoute = inject(ActivatedRoute);
  id: number = 0;

  constructor() {
    this.imagenproductoForm = this.fb.group({
      imagenproducto_id: [''],
      urlImagen : ['', Validators.required],
      producto_id : [''],
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
      this.imagenproductoService.listId(this.id).subscribe((data:Imagenproducto) => {
        console.log(data);
        this.imagenproductoForm.patchValue({
          urlImagen:data.urlImagen,
          //id_categoria:data.id_categoria
          producto_id: data.producto_id ? data.producto_id.producto_id : null
        });
      })
    }
  }

  onSubmit(){
    if(this.imagenproductoForm.valid){
      const imagenproducto : Imagenproducto = new Imagenproducto();
      imagenproducto.imagenproducto_id = this.id;

      imagenproducto.urlImagen = this.imagenproductoForm.value.urlImagen;

      const imgproducto = new Producto();
      imgproducto.producto_id = this.imagenproductoForm.value.producto_id;
      imagenproducto.producto_id = imgproducto;

      if(!this.edicion){
        console.log("Datos leidos del form:", imagenproducto);
        this.imagenproductoService.insert(imagenproducto).subscribe((data) => {
          console.log(data);
          this.imagenproductoService.actualizarLista();
          console.log("Lista Actualizada");
        });
      }else{
        console.log("Datos leidos del form:", imagenproducto);
        this.imagenproductoService.update(imagenproducto).subscribe((data) => {
          this.imagenproductoService.actualizarLista();
          console.log("Lista Actualizada", data);
        })
      }
      this.router.navigate(['imagenproducto']);
    }
    else{
      console.log("Formulario no valido");
    }
  }
}
