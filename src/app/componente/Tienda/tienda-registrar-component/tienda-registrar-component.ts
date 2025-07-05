import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {CategoriaService} from '../../../services/categoria-service';
import {Router} from '@angular/router';
import {Categoria} from '../../../model/categoria';
import {TiendaService} from '../../../services/tienda-service';
import {Tienda} from '../../../model/tienda';
import {User} from '../../../model/user';
import {UserService} from '../../../services/user-service';

@Component({
  selector: 'app-tienda-registrar-component',
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
  templateUrl: './tienda-registrar-component.html',
  styleUrl: './tienda-registrar-component.css'
})
export class TiendaRegistrarComponent {


  tiendaForm: FormGroup;
  fb = inject(FormBuilder);
  tiendaService: TiendaService = inject(TiendaService);
  userService: UserService = inject(UserService);
  router = inject(Router);
  listaUsers: User[] = [];
  //public idCategoria: number = 0;
  //categoria: Categoria = new Categoria();
  constructor() {
    this.tiendaForm = this.fb.group({
      tienda_id: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
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
    })

  }

  onSubmit(): void {
    if(this.tiendaForm.valid){
      const tienda:Tienda = new Tienda();
      //producto.idProducto = this.productoForm.controls['idProducto'].value;
      tienda.nombre = this.tiendaForm.controls['nombre'].value;
      tienda.descripcion = this.tiendaForm.controls['descripcion'].value;

      const userSeleccionado = new User();
      userSeleccionado.user_id = this.tiendaForm.value.user_id;
      tienda.user_id = userSeleccionado;

      console.log("Producto a enviar:", tienda);
      this.tiendaService.insert(tienda).subscribe({
        next: (data:Object) => {
          alert("Tienda Registrada!");
          console.log(data);
          this.tiendaService.actualizarLista();
        }
      });
      this.router.navigate(['tiendas']);
    }else {
      alert("Formulario invalido!");
      console.log("Formulario invalido");
    }
  }

  protected readonly User = User;
}
