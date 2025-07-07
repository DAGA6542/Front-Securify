import {inject, Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Pago} from '../model/pago';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private url: string = environment.apiURL;
  private httpClient: HttpClient = inject(HttpClient);
  private listaCambio: Subject<Pago[]> = new Subject<Pago[]>();

  constructor() { }

  list(): Observable<any>{
    return this.httpClient.get<Pago[]>(this.url + "pago/listapagos");
  }

  listId(id: number): Observable<any> {
    console.log(this.url + "pago/listapago/"+ id);
    return this.httpClient.get<Pago>(this.url+"pago/listapago/"+id);
  }
  insert(pago:Pago){
    console.log(pago);
    return this.httpClient.post(this.url+"pago/insertarpago", pago);
  }

  update(pago: Pago): Observable<any>{
    return this.httpClient.put(this.url + "pago/actualizarpago", pago);
  }
  delete(id: number): Observable<any>{
    return this.httpClient.delete(this.url + "pago/deletepago/" + id);
  }
  setList(listaNueva: Pago[]) {
    this.listaCambio.next(listaNueva); //envia la nueva lista a los suscriptores
  }
  getListaCambio(): Observable<Pago[]>{
    return this.listaCambio.asObservable();
  }
  actualizarLista(): void {
    this.list().subscribe({
      next: (data) => this.setList(data), //envia la nueva lista a los suscriptores
      error: (err) => console.error('Error actualizando lista', err)
    });
  }
}
