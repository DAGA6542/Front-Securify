import {Component, inject, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatPaginator} from '@angular/material/paginator';
import {Categoria} from '../../../model/categoria';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {CategoriaService} from '../../../services/categoria.service';
import {Router, RouterLink} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CategoriaEliminar} from './categoria-eliminar/categoria-eliminar';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-listar-categoria',
  imports: [
    MatPaginator,
    MatHeaderRow,
    MatCell,
    MatIconButton,
    MatHeaderCell,
    MatColumnDef,
    MatCellDef,
    MatHeaderCellDef,
    MatTable,
    MatIcon,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatButton,
    RouterLink
  ],
  templateUrl: './listar-categoria.html',
  styleUrl: './listar-categoria.css'
})
export class ListarCategoria {
  lista: Categoria[] = [];
  displayedColumns: string[] = ['categoria_id', 'nombre', 'descripcion','accion01', 'accion02' ];
  dataSource: MatTableDataSource<Categoria> = new MatTableDataSource<Categoria>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  categoriaService: CategoriaService = inject(CategoriaService);
  route : Router = inject(Router);
  dialog = inject(MatDialog);
  constructor() {
    console.log("Constructor")
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    console.log('Component ngOnInit llamando al API Get');
    this.categoriaService.getListaCambio().subscribe({
      next: data => this.dataSource.data = data
    })
    this.categoriaService.actualizarLista();
  }

  openDialog(categoria_id: number) {
    const dialogRef = this.dialog.open(CategoriaEliminar);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(categoria_id);
      }else {
        console.log('dialogo respondió no eliminar');
      }
    })
  }

  delete(categoria_id: number) {
    this.categoriaService.delete(categoria_id).subscribe({
      next: (data: Categoria) => {
        console.log("Datos devueltos por delete backend:");
        console.log(data);
        this.categoriaService.actualizarLista();
      }
    })
  }

}
