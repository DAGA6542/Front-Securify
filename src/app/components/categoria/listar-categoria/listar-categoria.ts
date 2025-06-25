import { Component } from '@angular/core';
import {DatePipe} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-listar-categoria',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderRowDef,
    MatRowDef,
    DatePipe,
    MatSort,
    MatSortHeader,
    MatButton,
    RouterLink,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    MatHeaderRow,
    MatRow,
    MatPaginator
  ],
  templateUrl: './listar-categoria.html',
  styleUrl: './listar-categoria.css'
})
export class ListarCategoria {

}
