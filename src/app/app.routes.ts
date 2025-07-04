import { Routes } from '@angular/router';
import {Login} from './components/login/login';
import {Home} from './components/home/home';
import {Registro} from './components/registro/registro';
import {CategoriaComponent} from './components/categoria-component/categoria-component';
import {ComentarioComponent} from './components/comentario-component/comentario-component';
import {TiendaComponent} from './components/tienda-component/tienda-component';
import {DetalleordenComponent} from './components/detalleorden-component/detalleorden-component';
import {OrdenComponent} from './components/orden-component/orden-component';
import {ProductoComponent} from './components/producto-component/producto-component';
import {PagoComponent} from './components/pago-component/pago-component';
import {ListarCategoriaComponent} from './components/categoria-component/listar-categoria-component/listar-categoria-component';
import {ListarTiendaComponent} from './components/tienda-component/listar-tienda-component/listar-tienda-component';
import {ListarProductoComponent} from './components/producto-component/listar-producto-component/listar-producto-component';
import {ListarPagoComponent} from './components/pago-component/listar-pago-component/listar-pago-component';
import {ListarOrdenComponent} from './components/orden-component/listar-orden-component/listar-orden-component';
import {ListarDetalleordenComponent} from './components/detalleorden-component/listar-detalleorden-component/listar-detalleorden-component';
import {ListarComentarioComponent} from './components/comentario-component/listar-comentario-component/listar-comentario-component';


export const routes: Routes = [
  {path: 'home', component: Home},
  {path: 'login', component: Login},
  {path: 'registro', component: Registro},
  {path: '', component: Login, pathMatch: 'full'},
  {path: 'producto', component: ProductoComponent},
  {path: 'producto/listar', component: ListarProductoComponent},
  {path: 'tienda', component: TiendaComponent},
  {path: 'tienda/listar', component: ListarTiendaComponent},
  {path: 'pago', component: PagoComponent},
  {path: 'pago/listar', component: ListarPagoComponent},
  {path: 'orden', component: OrdenComponent},
  {path: 'orden/listar', component: ListarOrdenComponent},
  {path: 'detalleorden', component: DetalleordenComponent},
  {path: 'detalleorden/listar', component: ListarDetalleordenComponent},
  {path: 'comentario', component: ComentarioComponent},
  {path: 'comentario/listar', component: ListarComentarioComponent},
  {path: 'categoria', component: CategoriaComponent},
  {path: 'categoria/listar', component: ListarCategoriaComponent},

];
