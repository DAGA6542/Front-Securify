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
import {Login} from './componente/login/login';
import {App} from './app';
import {
  ComentarioListarComponent
} from './componente/Comentario/comentario-listar-component/comentario-listar-component';
import {
  ComentarioNuevoEditComponent
} from './componente/Comentario/comentario-nuevo-edit-component/comentario-nuevo-edit-component';
import {
  ComentarioRegistrarComponent
} from './componente/Comentario/comentario-registrar-component/comentario-registrar-component';
import {OrdenListarComponent} from './componente/Orden/orden-listar-component/orden-listar-component';
import {OrdenNuevoEditComponent} from './componente/Orden/orden-nuevo-edit-component/orden-nuevo-edit-component';
import {OrdenRegistrarComponent} from './componente/Orden/orden-registrar-component/orden-registrar-component';
import {PagoListarComponent} from './componente/Pago/pago-listar-component/pago-listar-component';
import {PagoNuevoEditComponent} from './componente/Pago/pago-nuevo-edit-component/pago-nuevo-edit-component';
import {PagoRegistrarComponent} from './componente/Pago/pago-registrar-component/pago-registrar-component';
import {
  DetalleordenListarComponent
} from './componente/DetalleOrden/detalleorden-listar-component/detalleorden-listar-component';
import {
  DetalleordenNuevoEditComponent
} from './componente/DetalleOrden/detalleorden-nuevo-edit-component/detalleorden-nuevo-edit-component';
import {
  DetalleordenRegistrarComponent
} from './componente/DetalleOrden/detalleorden-registrar-component/detalleorden-registrar-component';

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
  {path: 'login', component: Login},
  {path: '', component: Login, pathMatch: 'full'},
  {path: 'app', component: App},
  {path: 'comentarios', component: ComentarioListarComponent},
  {path: 'edit-comentario/:id', component: ComentarioNuevoEditComponent},
  {path: 'post-comentario', component: ComentarioRegistrarComponent},
  {path: 'ordenes', component: OrdenListarComponent},
  {path: 'edit-orden/:id', component: OrdenNuevoEditComponent},
  {path: 'post-orden', component: OrdenRegistrarComponent},
  {path: 'pagos', component: PagoListarComponent},
  {path: 'edit-pago/:id', component: PagoNuevoEditComponent},
  {path: 'post-pago', component: PagoRegistrarComponent},
  {path: 'detalles', component: DetalleordenListarComponent},
  {path: 'edit-detalle/:id', component: DetalleordenNuevoEditComponent},
  {path: 'post-detalleorden', component: DetalleordenRegistrarComponent},

];
