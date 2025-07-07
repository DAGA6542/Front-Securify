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
import {ComentarioService} from '../../../services/comentario.service';
import {Comentario} from '../../../model/comentario';
import {Producto} from '../../../model/producto';
import {MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-comentario-nuevo-edit-component',
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
  templateUrl: './comentario-nuevo-edit-component.html',
  styleUrl: './comentario-nuevo-edit-component.css'
})
export class ComentarioNuevoEditComponent {

  comentarioForm : FormGroup;
  fb : FormBuilder = inject(FormBuilder)
  comentarioService = inject(ComentarioService);
  router = inject(Router);
  edicion : boolean = false;
  route : ActivatedRoute = inject(ActivatedRoute);
  id: number = 0;

  calificacionEstrellas: number[] = [
    1,
    2,
    3,
    4,
    5
  ];


  constructor() {
    this.comentarioForm = this.fb.group({
      comentario_id: [''],
      contenido : ['', Validators.required],
      calificacion : ['', Validators.required],
      user_id : [''],
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
      this.comentarioService.listId(this.id).subscribe((data:Comentario) => {
        console.log(data);
        this.comentarioForm.patchValue({
          contenido:data.contenido,
          calificacion:data.calificacion,
          user_id: data.user_id ? data.user_id.user_id : null,
          producto_id: data.producto_id ? data.producto_id.producto_id : null
        });
      })
    }
  }

  onSubmit(){
    if(this.comentarioForm.valid){
      const comentario : Comentario = new Comentario();
      comentario.comentario_id = this.id;

      comentario.contenido = this.comentarioForm.value.contenido;
      comentario.calificacion = this.comentarioForm.value.calificacion;

      const userComentario = new User();
      userComentario.user_id = this.comentarioForm.value.user_id;
      comentario.user_id = userComentario;

      const productoComentario = new Producto();
      productoComentario.producto_id = this.comentarioForm.value.producto_id;
      comentario.producto_id = productoComentario;

      if(!this.edicion){
        console.log("Datos leidos del form:", comentario);
        this.comentarioService.insert(comentario).subscribe((data) => {
          console.log(data);
          this.comentarioService.actualizarLista();
          console.log("Lista Actualizada");
        });
      }else{
        console.log("Datos leidos del form:", comentario);
        this.comentarioService.update(comentario).subscribe((data) => {
          this.comentarioService.actualizarLista();
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
