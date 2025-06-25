import {inject, Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {environments} from '../../environments/environments';
import {HttpClient} from '@angular/common/http';
import {Producto} from '../model/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url: string = environments.apiUrl;
  private httpClient: HttpClient = inject(HttpClient);
  private listaCambio: Subject<Producto[]> = new Subject<Producto[]>();

  constructor() { }

  list(): Observable<any>{
    return this.httpClient.get<Producto[]>(this.url + "producto/listaproducto");
  }

  listId(id: number): Observable<any> {
    console.log(this.url + "pago/buscapago/"+ id);
    return this.httpClient.get<Producto>(this.url+"producto/buscaproducto/"+id);
  }
  insert(producto:Producto){
    console.log(producto);
    return this.httpClient.post(this.url+"producto/insertproducto", producto);
  }

  update(producto: Producto): Observable<any>{
    return this.httpClient.put(this.url + "producto/editproducto", producto);
  }
  delete(id: number): Observable<any>{
    return this.httpClient.delete(this.url + "producto/deletecat/" + id);
  }
  setList(listaNueva: Producto[]) {
    this.listaCambio.next(listaNueva); //envia la nueva lista a los suscriptores
  }
  getListaCambio(): Observable<Producto[]>{
    return this.listaCambio.asObservable();
  }
  actualizarLista(): void {
    this.list().subscribe({
      next: (data) => this.setList(data), //envia la nueva lista a los suscriptores
      error: (err) => console.error('Error actualizando lista', err)
    });
  }
}
