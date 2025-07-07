import {Component, inject, ViewChild} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from '@angular/material/table';
import {Categoria} from '../../model/categoria';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {CategoriaService} from '../../services/categoria-service';
import {Router, RouterLink} from '@angular/router';
import {User} from '../../model/user';
import {UserService} from '../../services/user-service';

@Component({
  selector: 'app-user-listar-component',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderRowDef,
    MatRowDef,
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
    MatPaginator
  ],
  templateUrl: './user-listar-component.html',
  styleUrl: './user-listar-component.css'
})
export class UserListarComponent {

  lista: User[]=[];
  displayedColumns: string[]=['id', 'nombre', 'apellido', 'username', 'password', 'email','Accion01', 'Accion02'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  userService: UserService = inject(UserService);
  route:Router = inject(Router);
  constructor() {
    console.log("Constructor")
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {

    this.userService.list().subscribe({next: data => this.dataSource.data = data,
      error: error => console.log(error)});
  }

  eliminar(id: number) {
    this.userService.delete(id).subscribe({
      next: () => {
        this.userService.actualizarLista();
      },

    });
  }

}
