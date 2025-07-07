import {Categoria} from './categoria';
import {Tienda} from './tienda';

export class Producto {

  producto_id : number;
  nombre : string;
  descripcion : string;
  precio : number;
  stock : number;
  categoria_id : Categoria;
  tienda_id : Tienda;
}
