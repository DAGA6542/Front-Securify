import {Categoria} from './categoria';

export class Producto {

  idProducto : number;
  nombre : string;
  descripcion : string;
  precio : number;
  stock : number;
  id_categoria : Categoria;
}
