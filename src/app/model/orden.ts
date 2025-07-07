import {User} from './user';

export class Orden {
  orden_id: number;
  fecha: Date = new Date();
  estado: string;
  user_id: User;
}
