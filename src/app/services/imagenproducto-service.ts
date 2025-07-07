import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Producto} from '../model/producto';
import {Imagenproducto} from '../model/imagenproducto';

@Injectable({
  providedIn: 'root'
})
export class ImagenproductoService {

  private url = environment.apiURL;
  private httpClient: HttpClient = inject(HttpClient);
  private listaCambio: Subject<Imagenproducto[]> = new Subject<Imagenproducto[]>();
  constructor() { }

  list(): Observable<any>{
    return this.httpClient.get<Imagenproducto[]>(this.url + "imagenproducto/listaimagenproductos");
  }
  listId(id: number): Observable<any> {
    console.log(this.url + "imagenproducto/buscaimagenproducto/"+ id);
    return this.httpClient.get<Imagenproducto>(this.url+"imagenproducto/listaimagenproducto/"+id);
  }
  insert(imagenproducto:Imagenproducto): Observable<any>{
    console.log(imagenproducto);
    return this.httpClient.post(this.url+"imagenproducto/postimagenproducto", imagenproducto)
  }

  update(imagenproducto: Imagenproducto): Observable<any>{
    return this.httpClient.put(this.url + "imagenproducto/actualizarimagenproducto", imagenproducto);
  }
  delete(id: number): Observable<any>{
    return this.httpClient.delete(this.url + "imagenproducto/deleteimagenproducto/" + id);
  }
  setList(listaNueva: Imagenproducto[]) {
    this.listaCambio.next(listaNueva); //envia la nueva lista a los suscriptores
  }
  getListaCambio(): Observable<Imagenproducto[]>{
    return this.listaCambio.asObservable();
  }
  actualizarLista(): void {
    this.list().subscribe({
      next: (data) => this.setList(data), //envia la nueva lista a los suscriptores
      error: (err) => console.error('Error actualizando lista', err)
    });
  }
}
