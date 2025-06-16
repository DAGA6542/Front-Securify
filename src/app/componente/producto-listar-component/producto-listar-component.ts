import {Component, inject, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {DatePipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {Router, RouterLink} from '@angular/router';
import {Producto} from '../../model/producto';
import {ProductoService} from '../../services/producto-service';

@Component({
  selector: 'app-producto-listar-component',
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
  templateUrl: './producto-listar-component.html',
  styleUrl: './producto-listar-component.css'
})
export class ProductoListarComponent {

  lista: Producto[]=[];
  displayedColumns: string[]=['idProducto', 'nombre', 'descripcion', 'precio', 'stock', 'id_categoria', 'Accion01', 'Accion02'];
  dataSource: MatTableDataSource<Producto> = new MatTableDataSource<Producto>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  productoService: ProductoService = inject(ProductoService);
  route:Router = inject(Router);
  constructor() {
    console.log("Constructor")
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    this.productoService.list().subscribe({next: data => this.dataSource.data = data,
      error: error => console.log(error)});
  }

  eliminar(id: number) {
    this.productoService.delete(id).subscribe({
      next: () => {
        this.productoService.actualizarLista();
      },

    });
  }
}

