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
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {DatePipe} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {Producto} from '../../../model/producto';
import {ProductoService} from '../../../services/producto-service';
import {Detalleorden} from '../../../model/detalleorden';
import {DetalleordenService} from '../../../services/detalleorden.service';

@Component({
  selector: 'app-detalleorden-listar-component',
    imports: [
      MatTable,
      MatCellDef,
      MatHeaderCellDef,
      MatHeaderCell,
      MatCell,
      MatColumnDef,
      MatPaginator,
      MatHeaderRowDef,
      MatRowDef,
      MatSort,
      MatHeaderRow,
      MatRow,
      DatePipe,
      MatSortHeader,
      MatButton,
      RouterLink
    ],
  templateUrl: './detalleorden-listar-component.html',
  styleUrl: './detalleorden-listar-component.css'
})
export class DetalleordenListarComponent {

  lista: Detalleorden[]=[];
  displayedColumns: string[]=['detalleorden_id', 'cantidad', 'producto_id', 'orden_id', 'Accion01', 'Accion02'];
  dataSource: MatTableDataSource<Detalleorden> = new MatTableDataSource<Detalleorden>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  detalleordenService: DetalleordenService = inject(DetalleordenService);
  route:Router = inject(Router);
  constructor() {
    console.log("Constructor")
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    this.detalleordenService.list().subscribe({next: data => this.dataSource.data = data,
      error: error => console.log(error)});
  }

  eliminar(id: number) {
    this.detalleordenService.delete(id).subscribe({
      next: () => {
        this.detalleordenService.actualizarLista();
      },

    });
  }
}
