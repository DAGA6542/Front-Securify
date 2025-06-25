import {inject, Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Producto} from '../model/producto';
import {environments} from '../../environments/environments';
import {HttpClient} from '@angular/common/http';
import {Tienda} from '../model/tienda';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  private url: string = environments.apiUrl;
  private httpClient: HttpClient = inject(HttpClient);
  private listaCambio: Subject<Producto[]> = new Subject<Producto[]>();

  constructor() { }

  list(): Observable<any>{
    return this.httpClient.get<Tienda[]>(this.url + "tienda/listatienda");
  }

  listId(id: number): Observable<any> {
    console.log(this.url + "pago/buscapago/"+ id);
    return this.httpClient.get<Tienda>(this.url+"tienda/buscatienda/"+id);
  }
  insert(tienda:Tienda){
    console.log(tienda);
    return this.httpClient.post(this.url+"tienda/inserttienda", tienda);
  }

  update(tienda: Tienda): Observable<any>{
    return this.httpClient.put(this.url + "tienda/edittienda", tienda);
  }
  delete(id: number): Observable<any>{
    return this.httpClient.delete(this.url + "tienda/deletecat/" + id);
  }
  setList(listaNueva: Tienda[]) {
    this.listaCambio.next(listaNueva); //envia la nueva lista a los suscriptores
  }
  getListaCambio(): Observable<Tienda[]>{
    return this.listaCambio.asObservable();
  }
  actualizarLista(): void {
    this.list().subscribe({
      next: (data) => this.setList(data), //envia la nueva lista a los suscriptores
      error: (err) => console.error('Error actualizando lista', err)
    });
  }
}
