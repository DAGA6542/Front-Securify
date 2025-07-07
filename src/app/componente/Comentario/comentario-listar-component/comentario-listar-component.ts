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
import {Router, RouterLink, RouterModule} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {Tienda} from '../../../model/tienda';
import {TiendaService} from '../../../services/tienda-service';
import {Comentario} from '../../../model/comentario';
import {ComentarioService} from '../../../services/comentario.service';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-comentario-listar-component',
    imports: [
      MatTable,
      MatColumnDef,
      MatHeaderRowDef,
      MatRowDef,
      DatePipe,
      MatSort,
      MatButton,
      RouterLink,
      MatCellDef,
      MatHeaderCellDef,
      MatHeaderCell,
      MatCell,
      MatColumnDef,
      MatHeaderRow,
      MatRow,
      MatPaginator,
      MatFormFieldModule,
      RouterModule
    ],
  templateUrl: './comentario-listar-component.html',
  styleUrl: './comentario-listar-component.css'
})
export class ComentarioListarComponent {

  lista: Comentario[]=[];
  displayedColumns: string[]=['comentario_id', 'contenido', 'calificacion', 'fecha', 'user_id', 'producto_id', 'Accion01', 'Accion02'];
  dataSource: MatTableDataSource<Comentario> = new MatTableDataSource<Comentario>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  comentarioService: ComentarioService = inject(ComentarioService);
  route:Router = inject(Router);
  constructor() {
    console.log("Constructor")
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {

    this.comentarioService.list().subscribe({next: data => this.dataSource.data = data,
      error: error => console.log(error)});
  }

  eliminar(id: number) {
    this.comentarioService.delete(id).subscribe({
      next: () => {
        this.comentarioService.actualizarLista();
      },

    });
  }

}
