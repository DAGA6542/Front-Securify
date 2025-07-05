import {Component, inject} from '@angular/core';
import {MatToolbar, MatToolbarRow} from '@angular/material/toolbar';
import { MatIconButton} from '@angular/material/button';
import {Router, RouterLink} from '@angular/router';
import {MatFormField, MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbar,
    RouterLink,
    MatToolbarRow,
    MatFormField,
    MatInput,
    FormsModule,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './navbar.html',
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
