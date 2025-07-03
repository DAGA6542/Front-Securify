import { Routes } from '@angular/router';
import {Login} from './components/login/login';
import {Producto} from './model/producto';
import {Tienda} from './model/tienda';
import {Pago} from './model/pago';
import {Orden} from './model/orden';
import {Detalleorden} from './model/detalleorden';
import {Comentario} from './model/comentario';
import {Categoria} from './model/categoria';
import {Home} from './components/home/home';
import {InsertarProducto} from './components/producto/insertar-producto/insertar-producto';
import {ListarProducto} from './components/producto/listar-producto/listar-producto';
import {ListarTienda} from './components/tienda/listar-tienda/listar-tienda';
import {InsertarTienda} from './components/tienda/insertar-tienda/insertar-tienda';
import {InsertarPago} from './components/pago/insertar-pago/insertar-pago';
import {ListarPago} from './components/pago/listar-pago/listar-pago';
import {ListarOrden} from './components/orden/listar-orden/listar-orden';
import {InsertarOrden} from './components/orden/insertar-orden/insertar-orden';
import {InsertarDetalleorden} from './components/detalleorden/insertar-detalleorden/insertar-detalleorden';
import {ListarDetalleorden} from './components/detalleorden/listar-detalleorden/listar-detalleorden';
import {InsertarComentario} from './components/comentario/insertar-comentario/insertar-comentario';
import {ListarComentario} from './components/comentario/listar-comentario/listar-comentario';
import {InsertarCategoria} from './components/categoria/insertar-categoria/insertar-categoria';
import {ListarCategoria} from './components/categoria/listar-categoria/listar-categoria';
import {Registro} from './components/registro/registro';


export const routes: Routes = [
  {path: 'home', component: Home},
  {path: 'login', component: Login},
  {path: 'registro', component: Registro},
  {path: '', component: Login, pathMatch: 'full'},
  {path: 'producto', component: Producto},
  {path: 'producto/insertar', component: InsertarProducto},
  {path: 'producto/listar', component: ListarProducto},
  {path: 'tienda', component: Tienda},
  {path: 'tienda/insertar', component: InsertarTienda},
  {path: 'tienda/listar', component: ListarTienda},
  {path: 'pago', component: Pago},
  {path: 'pago/insertar', component: InsertarPago},
  {path: 'pago/listar', component: ListarPago},
  {path: 'orden', component: Orden},
  {path: 'orden/insertar', component: InsertarOrden},
  {path: 'orden/listar', component: ListarOrden},
  {path: 'detalleorden', component: Detalleorden},
  {path: 'detalleorden/insertar', component: InsertarDetalleorden},
  {path: 'detalleorden/listar', component: ListarDetalleorden},
  {path: 'comentario', component: Comentario},
  {path: 'comentario/insertar', component: InsertarComentario},
  {path: 'comentario/listar', component: ListarComentario},
  {path: 'categoria', component: Categoria},
  {path: 'categoria/insertar', component: InsertarCategoria},
  {path: 'categoria/listar', component: ListarCategoria},

];
