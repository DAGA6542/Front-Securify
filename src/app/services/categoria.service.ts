import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Categoria} from '../model/categoria';
import {environments} from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private url: string = environments.apiUrl;
  private httpClient: HttpClient = inject(HttpClient);
  private listaCambio: Subject<Categoria[]> = new Subject<Categoria[]>();

  constructor() { }

  list(): Observable<any>{
    return this.httpClient.get<Categoria[]>(this.url + "/categoria/listacategoria");
  }

  listId(id: number): Observable<any> {
    console.log(this.url + "categoria/buscacategoria/"+ id);
    return this.httpClient.get<Categoria>(this.url+"/categoria/buscacategoria/"+id);
  }
  insert(categoria:Categoria){
    console.log(categoria);
    return this.httpClient.post(this.url+"/categoria/insertarcategoria", categoria);
  }

  update(categoria: Categoria): Observable<any>{
    return this.httpClient.put(this.url + "categoria/editcategoria", categoria);
  }
  delete(id: number): Observable<any>{
    return this.httpClient.delete(this.url + "categoria/deletecat/" + id);
  }
  setList(listaNueva: Categoria[]) {
    this.listaCambio.next(listaNueva); //envia la nueva lista a los suscriptores
  }
  getListaCambio(): Observable<Categoria[]>{
    return this.listaCambio.asObservable();
  }
  actualizarLista(): void {
    this.list().subscribe({
      next: (data) => this.setList(data), //envia la nueva lista a los suscriptores
      error: (err) => console.error('Error actualizando lista', err)
    });
  }
}

