import {Component, inject} from '@angular/core';
import {MatColumnDef, MatTable, MatTableModule} from '@angular/material/table';
import {CommonModule} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ConfirmDialogo} from './confirm-dialogo/confirm-dialogo';
import {CategoriaService} from '../../../services/categoria.service';
import {Categoria} from '../../../model/categoria';


@Component({
  selector: 'app-listar-categoria-component',
  imports: [
    CommonModule,
    MatTableModule,
    MatButton,
    MatPaginator
  ],
  templateUrl: './listar-categoria-component.html',
  styleUrl: './listar-categoria-component.css'
})
export class ListarCategoriaComponent {
  categorias: Categoria[] = [];
  displayedColumns: string[] = ['categoria_id', 'nombre', 'descripcion', 'accion02', 'accion01'];

  private categoriaService = inject(CategoriaService);
  dialog = inject(MatDialog);
  router = inject(Router);

  ngOnInit(): void {
    this.categoriaService.getListaCambio().subscribe({
      next: (data) => {
        this.categorias = data;
      }
    });

    this.categoriaService.list().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (err) => {
        console.error('Error al obtener consultorios', err);
      }
    });
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogo);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(id);
      }else {
        console.log('dialogo respondió no eliminar');
      }
    })
  }

  delete(id: number) {
    this.categoriaService.delete(id).subscribe({
      next: (data: Categoria) => {
        console.log("Datos devueltos por delete backend:");
        console.log(data);
        this.categoriaService.actualizarLista();
      }
    })
  }

  editar(id: number) {
    this.router.navigate(['/categoria'], { queryParams: { id } });
  }
}
