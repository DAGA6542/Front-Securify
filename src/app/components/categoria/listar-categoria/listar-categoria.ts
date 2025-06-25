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
import {Categoria} from '../../../model/categoria';
import {CategoriaService} from '../../../services/categoria.service';

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

  lista: Categoria[]=[];
  displayedColumns: string[]=['categoria_id', 'nombre', 'descripcion', 'Accion01', 'Accion02'];
  dataSource: MatTableDataSource<Categoria> = new MatTableDataSource<Categoria>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  categoriaService: CategoriaService = inject(CategoriaService);
  route:Router = inject(Router);
  constructor() {
    console.log("Constructor")
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {

    this.categoriaService.list().subscribe({next: data => this.dataSource.data = data,
      error: error => console.log(error)});
  }

  eliminar(id: number) {
    this.categoriaService.delete(id).subscribe({
      next: () => {
        this.categoriaService.actualizarLista();
      },

    });
  }

}


