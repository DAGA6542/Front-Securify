export class Comentario {
  comentario_id: number;
  contenido: string;
  calificacion: number;
  fecha: Date = new Date();
  user_id: number;
  producto_id: number;
}
