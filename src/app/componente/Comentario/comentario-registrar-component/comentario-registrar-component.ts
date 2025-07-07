import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatSelect} from '@angular/material/select';
import {MatNativeDateModule, MatOption} from '@angular/material/core';
import {TiendaService} from '../../../services/tienda-service';
import {UserService} from '../../../services/user-service';
import {Router} from '@angular/router';
import {Tienda} from '../../../model/tienda';
import {ComentarioService} from '../../../services/comentario.service';
import {User} from '../../../model/user';
import {Comentario} from '../../../model/comentario';
import {Producto} from '../../../model/producto';
import {ProductoService} from '../../../services/producto-service';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-comentario-registrar-component',
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
    MatButton,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './comentario-registrar-component.html',
  styleUrl: './comentario-registrar-component.css'
})
export class ComentarioRegistrarComponent {

  comentarioForm: FormGroup;
  fb = inject(FormBuilder);
  comentarioService: ComentarioService = inject(ComentarioService);
  userService: UserService = inject(UserService);
  productoService: ProductoService = inject(ProductoService);
  router = inject(Router);
  listaUsers: User[] = [];
  listaProductos: Producto[] = [];
  //public idCategoria: number = 0;
  //categoria: Categoria = new Categoria();

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
      contenido: ['', Validators.required],
      calificacion: ['', Validators.required],
      fecha: ['', Validators.required],
      user_id: ['', Validators.required],
      producto_id: ['', Validators.required],
    })
  }
  ngOnInit(): void {
    this.userService.list().subscribe({
      next: (data: User[]) => {
        this.listaUsers= data;
      },

      error: (error) => {
        console.log(error);
      }
    })
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
    if(this.comentarioForm.valid){
      const comentario: Comentario = new Comentario();
      //producto.idProducto = this.productoForm.controls['idProducto'].value;
      comentario.contenido = this.comentarioForm.controls['contenido'].value;
      comentario.calificacion = this.comentarioForm.controls['calificacion'].value;
      comentario.fecha = this.comentarioForm.controls['fecha'].value;

      const userSeleccionado = new User();
      userSeleccionado.user_id = this.comentarioForm.value.user_id;
      comentario.user_id = userSeleccionado;

      const productoSeleccionado = new Producto();
      productoSeleccionado.producto_id = this.comentarioForm.value.producto_id;
      comentario.producto_id = productoSeleccionado;

      console.log("Comentario a enviar:", comentario);
      this.comentarioService.insert(comentario).subscribe({
        next: (data:Object) => {
          alert("Comentario Registrado!");
          console.log(data);
          this.comentarioService.actualizarLista();
        }
      });
      this.router.navigate(['comentarios']);
    }else {
      alert("Formulario invalido!");
      console.log("Formulario invalido");
    }
  }

  protected readonly User = User;
}
