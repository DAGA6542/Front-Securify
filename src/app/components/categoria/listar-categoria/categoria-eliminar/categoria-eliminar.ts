import { Component } from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-categoria-eliminar',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton
  ],
  templateUrl: './categoria-eliminar.html',
  styleUrl: './categoria-eliminar.css'
})
export class CategoriaEliminar {

}
