import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Producto} from '../model/producto';
import {Categoria} from '../model/categoria';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url = environment.apiURL;
  private httpClient: HttpClient = inject(HttpClient);
  private listaCambio: Subject<Producto[]> = new Subject<Producto[]>();
  constructor() { }

  list(): Observable<any>{
    return this.httpClient.get<Producto[]>(this.url + "producto/listaproducto");
  }
  listId(id: number): Observable<any> {
    console.log(this.url + "producto/buscaproducto/"+ id);
    return this.httpClient.get<Producto>(this.url+"producto/buscaproducto/"+id);
  }
  insert(producto:Producto): Observable<any>{
    console.log(producto);
    return this.httpClient.post(this.url+"producto/insertproducto", producto)
  }

  update(producto: Producto): Observable<any>{
    return this.httpClient.put(this.url + "producto/updateproducto", producto);
  }
  delete(id: number): Observable<any>{
    return this.httpClient.delete(this.url + "producto/deleteproducto/" + id);
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

