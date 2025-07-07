import {User} from './user';
import {Producto} from './producto';

export class Comentario {
  comentario_id: number;
  contenido: string;
  calificacion: number;
  fecha: Date = new Date();
  user_id: User;
  producto_id: Producto;
}
