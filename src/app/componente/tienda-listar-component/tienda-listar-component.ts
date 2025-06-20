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
import {Categoria} from '../../model/categoria';
import {CategoriaService} from '../../services/categoria-service';
import {Tienda} from '../../model/tienda';
import {TiendaService} from '../../services/tienda-service';

@Component({
  selector: 'app-tienda-listar-component',
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
  templateUrl: './tienda-listar-component.html',
  styleUrl: './tienda-listar-component.css'
})
export class TiendaListarComponent {

  lista: Tienda[]=[];
  displayedColumns: string[]=['idTienda', 'nombre', 'descripcion', 'Accion01', 'Accion02'];
  dataSource: MatTableDataSource<Tienda> = new MatTableDataSource<Tienda>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  tiendaService: TiendaService = inject(TiendaService);
  route:Router = inject(Router);
  constructor() {
    console.log("Constructor")
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {

    this.tiendaService.list().subscribe({next: data => this.dataSource.data = data,
      error: error => console.log(error)});
  }

  eliminar(id: number) {
    this.tiendaService.delete(id).subscribe({
      next: () => {
        this.tiendaService.actualizarLista();
      },

    });
  }
}
