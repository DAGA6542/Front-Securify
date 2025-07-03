import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {Navbar} from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Front-Securify';

  esUsuario(){
    let ok=false;
    let rol=localStorage.getItem('rol');
    if(rol == "ROLE_USER"){
      ok=true;
    }
    return ok;
  }
}
