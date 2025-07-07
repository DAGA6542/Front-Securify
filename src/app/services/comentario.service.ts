import {inject, Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Comentario} from '../model/comentario';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private url: string = environment.apiURL;
  private httpClient: HttpClient = inject(HttpClient);
  private listaCambio: Subject<Comentario[]> = new Subject<Comentario[]>();

  constructor() { }

  list(): Observable<any>{
    return this.httpClient.get<Comentario[]>(this.url + "comentario/listacomentarios");
  }

  listId(id: number): Observable<any> {
    console.log(this.url + "comentario/buscacomentario/"+ id);
    return this.httpClient.get<Comentario>(this.url+"comentario/listacomentario/"+id);
  }
  insert(comentario:Comentario){
    console.log(comentario);
    return this.httpClient.post(this.url+"comentario/insertarcomentario", comentario);
  }

  update(comentario: Comentario): Observable<any>{
    return this.httpClient.put(this.url + "comentario/actualizarcomentario", comentario);
  }
  delete(id: number): Observable<any>{
    return this.httpClient.delete(this.url + "comentario/deletecomentario/" + id);
  }
  setList(listaNueva: Comentario[]) {
    this.listaCambio.next(listaNueva); //envia la nueva lista a los suscriptores
  }
  getListaCambio(): Observable<Comentario[]>{
    return this.listaCambio.asObservable();
  }
  actualizarLista(): void {
    this.list().subscribe({
      next: (data) => this.setList(data), //envia la nueva lista a los suscriptores
      error: (err) => console.error('Error actualizando lista', err)
    });
  }
}
