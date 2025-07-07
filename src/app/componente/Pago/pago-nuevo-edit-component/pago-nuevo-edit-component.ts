import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatFormField, MatHint, MatInput, MatInputModule, MatLabel, MatSuffix} from '@angular/material/input';
import {MatNativeDateModule, MatOption} from '@angular/material/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {MatSelect} from '@angular/material/select';
import {OrdenService} from '../../../services/orden.service';
import {Orden} from '../../../model/orden';
import {User} from '../../../model/user';
import {PagoService} from '../../../services/pago.service';
import {Pago} from '../../../model/pago';

@Component({
  selector: 'app-pago-nuevo-edit-component',
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
  templateUrl: './pago-nuevo-edit-component.html',
  styleUrl: './pago-nuevo-edit-component.css'
})
export class PagoNuevoEditComponent {

  pagoForm : FormGroup;
  fb : FormBuilder = inject(FormBuilder)
  pagoService = inject(PagoService);
  router = inject(Router);
  edicion : boolean = false;
  route : ActivatedRoute = inject(ActivatedRoute);
  id: number = 0;

  metodoSeleccionado: string[] = [
    "Tarjeta",
    "Efectivo",
    "QR"
  ];

  constructor() {
    this.pagoForm = this.fb.group({
      pago_id: [''],
      metodo : ['', Validators.required],
      monto : ['', Validators.required],
      fecha : ['', Validators.required],
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
      this.pagoService.listId(this.id).subscribe((data:Pago) => {
        console.log(data);
        this.pagoForm.patchValue({
          metodo:data.metodo,
          monto:data.monto,
          fecha:data.fecha,

          orden_id: data.orden_id ? data.orden_id.orden_id : null
        });
      })
    }
  }

  onSubmit(){
    if(this.pagoForm.valid){
      const pago : Pago = new Pago();
      pago.pago_id = this.id;
      pago.metodo = this.pagoForm.value.metodo;
      pago.monto = this.pagoForm.value.monto;
      pago.fecha = this.pagoForm.value.fecha;

      const ordenPago = new Orden();
      ordenPago.orden_id = this.pagoForm.value.orden_id;
      pago.orden_id = ordenPago;

      if(!this.edicion){
        console.log("Datos leidos del form:", pago);
        this.pagoService.insert(pago).subscribe((data) => {
          console.log(data);
          this.pagoService.actualizarLista();
          console.log("Lista Actualizada");
        });
      }else{
        console.log("Datos leidos del form:", pago);
        this.pagoService.update(pago).subscribe((data) => {
          this.pagoService.actualizarLista();
          console.log("Lista Actualizada", data);
        })
      }
      this.router.navigate(['pagos']);
    }
    else{
      console.log("Formulario no valido");
    }
  }
}
