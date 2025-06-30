import { Routes } from '@angular/router';
import {HomeComponent} from './componente/home-component/home-component';
import {CategoriaListarComponent} from './componente/Categoria/categoria-listar-component/categoria-listar-component';
import {ProductoListarComponent} from './componente/Producto/producto-listar-component/producto-listar-component';
import {ProductoNuevoEditComponent} from './componente/Producto/producto-nuevo-edit-component/producto-nuevo-edit-component';
import {CategoriaNuevoEditComponent} from './componente/Categoria/categoria-nuevo-edit-component/categoria-nuevo-edit-component';
import {CategoriaRegistrarComponent} from './componente/Categoria/categoria-registrar-component/categoria-registrar-component';
import {ProductoRegistrarComponent} from './componente/Producto/producto-registrar-component/producto-registrar-component';
import {TiendaListarComponent} from './componente/Tienda/tienda-listar-component/tienda-listar-component';
import {TiendaNuevoEditComponent} from './componente/Tienda/tienda-nuevo-edit-component/tienda-nuevo-edit-component';
import {TiendaRegistrarComponent} from './componente/Tienda/tienda-registrar-component/tienda-registrar-component';

export const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'categorias', component: CategoriaListarComponent},
  {path: 'productos', component: ProductoListarComponent},
  {path: 'edit-categoria/:id', component: CategoriaNuevoEditComponent},
  {path: 'edit-producto/:id', component: ProductoNuevoEditComponent},
  {path: 'post-categoria', component: CategoriaRegistrarComponent},
  {path: 'post-producto', component: ProductoRegistrarComponent},
  {path: 'tiendas', component: TiendaListarComponent},
  {path: 'edit-tienda/:id', component: TiendaNuevoEditComponent},
  {path: 'post-tienda', component: TiendaRegistrarComponent}
];
