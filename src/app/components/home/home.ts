import {Component, inject, ViewChild} from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule, MatNavList} from '@angular/material/list';
import {MatButton, MatButtonModule, MatIconButton} from '@angular/material/button';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {MatExpansionModule, MatExpansionPanel} from '@angular/material/expansion';
import {MatMenu, MatMenuItem, MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    MatSidenavContainer,
    MatNavList,
    MatButton,
    RouterLink,
    MatExpansionPanel,
    MatMenuTrigger,
    MatToolbar,
    MatIconButton,
    MatIcon,
    RouterOutlet,
    MatMenu,
    MatMenuItem,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatListModule,
    MatSidenavModule,
    MatExpansionModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  title = 'Securify';
  role: string = '';
  loggedIn: boolean = false;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  router = inject(Router);

  esAdministrador(){
    let ok = false;
    let  rol = localStorage.getItem('rol');
    if(rol == "ROLE_ADMIN" ){
      ok = true;
    }
    return ok;
  }

  esUsuario(){
    let ok = false;
    let  rol = localStorage.getItem('rol');
    if(rol == "ROLE_USER" ){
      ok = true;
    }
    return ok;
  }

  esVendedor(){
    let ok = false;
    let  rol = localStorage.getItem('rol');
    if(rol == "ROLE_SELLER" ){
      ok = true;
    }
    return ok;
  }

}
