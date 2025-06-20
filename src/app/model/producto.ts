import {Categoria} from './categoria';
import {Tienda} from './tienda';

export class Producto {

  idProducto : number;
  nombre : string;
  descripcion : string;
  precio : number;
  stock : number;
  id_categoria : Categoria;
  id_tienda : Tienda;
}
