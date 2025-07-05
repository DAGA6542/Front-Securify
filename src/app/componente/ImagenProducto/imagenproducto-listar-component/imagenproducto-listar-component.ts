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
import {Imagenproducto} from '../../../model/imagenproducto';
import {ImagenproductoService} from '../../../services/imagenproducto-service';

@Component({
  selector: 'app-imagenproducto-listar-component',
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
  templateUrl: './imagenproducto-listar-component.html',
  styleUrl: './imagenproducto-listar-component.css'
})
export class ImagenproductoListarComponent {

  lista: Imagenproducto[]=[];
  displayedColumns: string[]=['imagenproducto_id', 'urlImagen', 'producto_id', 'Accion01', 'Accion02'];
  dataSource: MatTableDataSource<Imagenproducto> = new MatTableDataSource<Imagenproducto>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  imagenproductoService: ImagenproductoService = inject(ImagenproductoService);
  route:Router = inject(Router);
  constructor() {
    console.log("Constructor")
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    this.imagenproductoService.list().subscribe({next: data => this.dataSource.data = data,
      error: error => console.log(error)});
  }

  eliminar(id: number) {
    this.imagenproductoService.delete(id).subscribe({
      next: () => {
        this.imagenproductoService.actualizarLista();
      },

    });
  }
}
