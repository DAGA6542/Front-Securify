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
import {ComentarioService} from '../../../services/comentario.service';
import {Comentario} from '../../../model/comentario';

@Component({
  selector: 'app-listar-comentario',
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
  templateUrl: './listar-comentario.html',
  styleUrl: './listar-comentario.css'
})
export class ListarComentario {

  lista: Comentario[]=[];
  displayedColumns: string[]=['comentario_id', 'nombre', 'descripcion'];
  dataSource: MatTableDataSource<Comentario> = new MatTableDataSource<Comentario>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  categoriaService: ComentarioService = inject(ComentarioService);
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
