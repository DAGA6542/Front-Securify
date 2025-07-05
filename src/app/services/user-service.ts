import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Tienda} from '../model/tienda';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.apiURL;
  private httpClient: HttpClient = inject(HttpClient);
  private listaCambio: Subject<User[]> = new Subject<User[]>();

  constructor() { }

  list(): Observable<any>{
    return this.httpClient.get<User[]>(this.url + "user/listausers");
  }
  listId(id: number): Observable<any> {
    console.log(this.url + "user/buscauser/"+ id);
    return this.httpClient.get<User>(this.url+"user/buscauser/"+id);
  }
  insert(user:User): Observable<any>{
    console.log(user);
    return this.httpClient.post(this.url+"tiendas/insertaruser", user);
  }

  update(user: User): Observable<any>{
    return this.httpClient.put(this.url + "tiendas/actualizaruser", user);
  }
  delete(id: number): Observable<any>{
    return this.httpClient.delete(this.url + "tiendas/eliminaruser/" + id);
  }
  setList(listaNueva: User[]) {
    this.listaCambio.next(listaNueva); //envia la nueva lista a los suscriptores
  }
  getListaCambio(): Observable<User[]>{
    return this.listaCambio.asObservable();
  }
  actualizarLista(): void {
    this.list().subscribe({
      next: (data) => this.setList(data), //envia la nueva lista a los suscriptores
      error: (err) => console.error('Error actualizando lista', err)
    });
  }
}
