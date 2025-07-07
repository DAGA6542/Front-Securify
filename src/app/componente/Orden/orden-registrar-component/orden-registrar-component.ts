import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatFormField, MatInput, MatLabel, MatSuffix} from "@angular/material/input";
import {MatSelect} from '@angular/material/select';
import {MatNativeDateModule, MatOption} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ComentarioService} from '../../../services/comentario.service';
import {UserService} from '../../../services/user-service';
import {ProductoService} from '../../../services/producto-service';
import {Router} from '@angular/router';
import {Producto} from '../../../model/producto';
import {Comentario} from '../../../model/comentario';
import {User} from '../../../model/user';
import {Orden} from '../../../model/orden';
import {OrdenService} from '../../../services/orden.service';

@Component({
  selector: 'app-orden-registrar-component',
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
  templateUrl: './orden-registrar-component.html',
  styleUrl: './orden-registrar-component.css'
})
export class OrdenRegistrarComponent {

  ordenForm: FormGroup;
  fb = inject(FormBuilder);
  ordenService: OrdenService = inject(OrdenService);
  userService: UserService = inject(UserService);
  router = inject(Router);
  listaUsers: User[] = [];
  //public idCategoria: number = 0;
  //categoria: Categoria = new Categoria();

  estadoSeleccionado: string[] = [
    "Terminado",
    "En proceso",
    "Cancelado"
  ];

  constructor() {
    this.ordenForm = this.fb.group({
      orden_id: [''],
      fecha: ['', Validators.required],
      estado: ['', Validators.required],
      user_id: ['', Validators.required],
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
    });

  }

  onSubmit(): void {
    if(this.ordenForm.valid){
      const orden: Orden = new Orden();
      //producto.idProducto = this.productoForm.controls['idProducto'].value;
      orden.fecha = this.ordenForm.controls['fecha'].value;
      orden.estado = this.ordenForm.controls['estado'].value;

      const userSeleccionado = new User();
      userSeleccionado.user_id = this.ordenForm.value.user_id;
      orden.user_id = userSeleccionado;

      console.log("Orden a enviar:", orden);
      this.ordenService.insert(orden).subscribe({
        next: (data:Object) => {
          alert("Comentario Registrado!");
          console.log(data);
          this.ordenService.actualizarLista();
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
