import { Routes } from '@angular/router';
import {HomeComponent} from './componente/home-component/home-component';
import {CategoriaListarComponent} from './componente/categoria-listar-component/categoria-listar-component';
import {ProductoListarComponent} from './componente/producto-listar-component/producto-listar-component';
import {CategoriaNuevoEditComponent} from './componente/categoria-nuevo-edit-component/categoria-nuevo-edit-component';
import {ProductoNuevoEditComponent} from './componente/producto-nuevo-edit-component/producto-nuevo-edit-component';

export const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'categorias', component: CategoriaListarComponent},
  {path: 'productos', component: ProductoListarComponent},
  {path: 'edit-categoria/:id', component: CategoriaNuevoEditComponent},
  {path: 'edit-producto/:id', component: ProductoNuevoEditComponent},
];
