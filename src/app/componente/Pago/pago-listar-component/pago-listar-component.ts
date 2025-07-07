import {Component, inject, ViewChild} from '@angular/core';
import {DatePipe} from "@angular/common";
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
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {Router, RouterLink} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {Tienda} from '../../../model/tienda';
import {Orden} from '../../../model/orden';
import {OrdenService} from '../../../services/orden.service';
import {Pago} from '../../../model/pago';
import {PagoService} from '../../../services/pago.service';

@Component({
  selector: 'app-pago-listar-component',
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
  templateUrl: './pago-listar-component.html',
  styleUrl: './pago-listar-component.css'
})
export class PagoListarComponent {

  lista: Pago[]=[];
  displayedColumns: string[]=['pago_id', 'metodo', 'monto', 'fecha', 'orden_id', 'Accion01', 'Accion02'];
  dataSource: MatTableDataSource<Pago> = new MatTableDataSource<Pago>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pagoService: PagoService = inject(PagoService);
  route:Router = inject(Router);
  constructor() {
    console.log("Constructor")
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {

    this.pagoService.list().subscribe({next: data => this.dataSource.data = data,
      error: error => console.log(error)});
  }

  eliminar(id: number) {
    this.pagoService.delete(id).subscribe({
      next: () => {
        this.pagoService.actualizarLista();
      },

    });
  }

}
