import {Component, inject} from '@angular/core';
import {MatToolbar, MatToolbarRow} from '@angular/material/toolbar';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbar,
    RouterLink,
    MatToolbarRow,
  ],
  templateUrl: './navbar.html',
  standalone: true,
  styleUrl: './navbar.css'
})
export class Navbar {
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
