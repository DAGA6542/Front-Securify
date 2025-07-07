import {Orden} from './orden';
import {Producto} from './producto';

export class Detalleorden {
  detalleorden_id: number;
  cantidad: number;
  producto_id: Producto;
  orden_id: Orden;
}
