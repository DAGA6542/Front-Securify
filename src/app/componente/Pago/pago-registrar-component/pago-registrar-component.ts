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
import {OrdenService} from '../../../services/orden.service';
import {UserService} from '../../../services/user-service';
import {Router} from '@angular/router';
import {Orden} from '../../../model/orden';
import {PagoService} from '../../../services/pago.service';
import {Pago} from '../../../model/pago';

@Component({
  selector: 'app-pago-registrar-component',
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
  templateUrl: './pago-registrar-component.html',
  styleUrl: './pago-registrar-component.css'
})
export class PagoRegistrarComponent {

  pagoForm: FormGroup;
  fb = inject(FormBuilder);
  pagoService: PagoService = inject(PagoService);
  ordenService: OrdenService = inject(OrdenService);
  router = inject(Router);
  listaOrdenes: Orden[] = [];
  //public idCategoria: number = 0;
  //categoria: Categoria = new Categoria();

  metodoSeleccionado: string[] = [
    "Tarjeta",
    "Efectivo",
    "QR"
  ];

  constructor() {
    this.pagoForm = this.fb.group({
      pago_id: [''],
      metodo: ['', Validators.required],
      monto: ['', Validators.required],
      fecha: ['', Validators.required],
      orden_id: ['', Validators.required],
    })
  }
  ngOnInit(): void {
    this.ordenService.list().subscribe({
      next: (data: Orden[]) => {
        this.listaOrdenes= data;
      },

      error: (error) => {
        console.log(error);
      }
    });

  }

  onSubmit(): void {
    if(this.pagoForm.valid){
      const pago: Pago = new Pago();
      //producto.idProducto = this.productoForm.controls['idProducto'].value;
      pago.metodo = this.pagoForm.controls['metodo'].value;
      pago.monto = this.pagoForm.controls['monto'].value;
      pago.fecha = this.pagoForm.controls['fecha'].value;

      const ordenSeleccionada = new Orden();
      ordenSeleccionada.orden_id = this.pagoForm.value.orden_id;
      pago.orden_id = ordenSeleccionada;

      console.log("Pago a enviar:", pago);
      this.pagoService.insert(pago).subscribe({
        next: (data:Object) => {
          alert("Pago Registrado!");
          console.log(data);
          this.pagoService.actualizarLista();
        }
      });
      this.router.navigate(['comentarios']);
    }else {
      alert("Formulario invalido!");
      console.log("Formulario invalido");
    }
  }

  protected readonly Orden = Orden;
}
