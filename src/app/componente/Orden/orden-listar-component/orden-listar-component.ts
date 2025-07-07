import {Component, inject, ViewChild} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {DatePipe} from '@angular/common';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {Router, RouterLink} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {Tienda} from '../../../model/tienda';
import {TiendaService} from '../../../services/tienda-service';
import {Orden} from '../../../model/orden';
import {OrdenService} from '../../../services/orden.service';

@Component({
  selector: 'app-orden-listar-component',
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
  templateUrl: './orden-listar-component.html',
  styleUrl: './orden-listar-component.css'
})
export class OrdenListarComponent {

  lista: Tienda[]=[];
  displayedColumns: string[]=['orden_id', 'fecha', 'estado', 'user_id', 'Accion01', 'Accion02'];
  dataSource: MatTableDataSource<Orden> = new MatTableDataSource<Orden>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ordenService: OrdenService = inject(OrdenService);
  route:Router = inject(Router);
  constructor() {
    console.log("Constructor")
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {

    this.ordenService.list().subscribe({next: data => this.dataSource.data = data,
      error: error => console.log(error)});
  }

  eliminar(id: number) {
    this.ordenService.delete(id).subscribe({
      next: () => {
        this.ordenService.actualizarLista();
      },

    });
  }
}
