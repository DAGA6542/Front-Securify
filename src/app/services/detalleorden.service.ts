import {inject, Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {environments} from '../../environments/environments';
import {HttpClient} from '@angular/common/http';
import {Detalleorden} from '../model/detalleorden';

@Injectable({
  providedIn: 'root'
})
export class DetalleordenService {

  private url: string = environments.apiUrl;
  private httpClient: HttpClient = inject(HttpClient);
  private listaCambio: Subject<Detalleorden[]> = new Subject<Detalleorden[]>();

  constructor() { }

  list(): Observable<any>{
    return this.httpClient.get<Detalleorden[]>(this.url + "detalleorden/listadetalleordeno");
  }

  listId(id: number): Observable<any> {
    console.log(this.url + "detalleorden/buscadetalleorden/"+ id);
    return this.httpClient.get<Detalleorden>(this.url+"detalleorden/buscadetalleorden/"+id);
  }
  insert(detalleorden:Detalleorden){
    console.log(detalleorden);
    return this.httpClient.post(this.url+"detalleorden/insertdetalleorden", detalleorden);
  }

  update(detalleorden: Detalleorden): Observable<any>{
    return this.httpClient.put(this.url + "detalleorden/editdetalleorden", detalleorden);
  }
  delete(id: number): Observable<any>{
    return this.httpClient.delete(this.url + "detalleorden/deletecat/" + id);
  }
  setList(listaNueva: Detalleorden[]) {
    this.listaCambio.next(listaNueva); //envia la nueva lista a los suscriptores
  }
  getListaCambio(): Observable<Detalleorden[]>{
    return this.listaCambio.asObservable();
  }
  actualizarLista(): void {
    this.list().subscribe({
      next: (data) => this.setList(data), //envia la nueva lista a los suscriptores
      error: (err) => console.error('Error actualizando lista', err)
    });
  }
}
