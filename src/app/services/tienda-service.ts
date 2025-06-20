import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Producto} from '../model/producto';
import {Tienda} from '../model/tienda';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  private url = environment.apiURL;
  private httpClient: HttpClient = inject(HttpClient);
  private listaCambio: Subject<Tienda[]> = new Subject<Tienda[]>();

  constructor() { }

  list(): Observable<any>{
    return this.httpClient.get<Tienda[]>(this.url + "tiendas/listartienda");
  }
  listId(id: number): Observable<any> {
    console.log(this.url + "tiendas/buscatienda/"+ id);
    return this.httpClient.get<Tienda>(this.url+"tiendas/buscatienda/"+id);
  }
  insert(tienda:Tienda): Observable<any>{
    console.log(tienda);
    return this.httpClient.post(this.url+"tiendas/inserttienda", tienda);
  }

  update(tienda: Tienda): Observable<any>{
    return this.httpClient.put(this.url + "tiendas/edittienda", tienda);
  }
  delete(id: number): Observable<any>{
    return this.httpClient.delete(this.url + "tiendas/deletetienda/" + id);
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
