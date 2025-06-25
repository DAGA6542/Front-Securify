export class Pago {
  pago_id: number;
  metodo: string;
  monto: number;
  fecha: Date = new Date();
  orden_id: number;
}
