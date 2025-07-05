import {inject, Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Orden} from '../model/orden';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  private url: string = environment.apiURL;
  private httpClient: HttpClient = inject(HttpClient);
  private listaCambio: Subject<Orden[]> = new Subject<Orden[]>();

  constructor() { }

  list(): Observable<any>{
    return this.httpClient.get<Orden[]>(this.url + "orden/listaorden");
  }

  listId(id: number): Observable<any> {
    console.log(this.url + "orden/buscaorden/"+ id);
    return this.httpClient.get<Orden>(this.url+"orden/buscaorden/"+id);
  }
  insert(orden:Orden){
    console.log(orden);
    return this.httpClient.post(this.url+"orden/insertorden", orden);
  }

  update(orden: Orden): Observable<any>{
    return this.httpClient.put(this.url + "orden/editorden", orden);
  }
  delete(id: number): Observable<any>{
    return this.httpClient.delete(this.url + "orden/deletecat/" + id);
  }
  setList(listaNueva: Orden[]) {
    this.listaCambio.next(listaNueva); //envia la nueva lista a los suscriptores
  }
  getListaCambio(): Observable<Orden[]>{
    return this.listaCambio.asObservable();
  }
  actualizarLista(): void {
    this.list().subscribe({
      next: (data) => this.setList(data), //envia la nueva lista a los suscriptores
      error: (err) => console.error('Error actualizando lista', err)
    });
  }
}
