import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Categoria} from '../model/categoria';
import {environments} from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private url = "http://localhost:8080/categoria";
  private httpClient: HttpClient = inject(HttpClient);
  private listaCambio: Subject<Categoria[]> = new Subject<Categoria[]>();

  constructor() { }
  list():Observable<any> {
    return this.httpClient.get<Categoria[]>(this.url+"/listacategoria")
  }

  insert(categoria:Categoria){
    console.log(categoria);
    return this.httpClient.post(this.url+"/insertarcategoria", categoria)
  }
  delete(id: number): Observable<any>{
    return this.httpClient.delete(this.url + "/eliminarcategoria/" + id);
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
  update(categoria: Categoria) {
    return this.httpClient.put(this.url + "/actualizarcategoria", categoria);
  }
}

