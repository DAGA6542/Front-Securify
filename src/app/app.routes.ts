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
import {
  ImagenproductoListarComponent
} from './componente/ImagenProducto/imagenproducto-listar-component/imagenproducto-listar-component';
import {
  ImagenproductoNuevoEditComponent
} from './componente/ImagenProducto/imagenproducto-nuevo-edit-component/imagenproducto-nuevo-edit-component';
import {
  ImagenproductoRegistrarComponent
} from './componente/ImagenProducto/imagenproducto-registrar-component/imagenproducto-registrar-component';
import {UserListarComponent} from './componente/user-listar-component/user-listar-component';

export const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'categorias', component: CategoriaListarComponent},
  {path: 'edit-categoria/:id', component: CategoriaNuevoEditComponent},
  {path: 'post-categoria', component: CategoriaRegistrarComponent},
  {path: 'productos', component: ProductoListarComponent},
  {path: 'edit-producto/:id', component: ProductoNuevoEditComponent},
  {path: 'post-producto', component: ProductoRegistrarComponent},
  {path: 'imagenproducto', component: ImagenproductoListarComponent},
  {path: 'edit-imagenproducto/:id', component: ImagenproductoNuevoEditComponent},
  {path: 'post-imagenproducto', component: ImagenproductoRegistrarComponent},
  {path: 'tiendas', component: TiendaListarComponent},
  {path: 'edit-tienda/:id', component: TiendaNuevoEditComponent},
  {path: 'post-tienda', component: TiendaRegistrarComponent},
  {path: 'users', component: UserListarComponent},
];
