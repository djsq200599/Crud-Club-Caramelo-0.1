import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, ObservableLike } from 'rxjs';
import { Automovil, AutomovilID, AutomovilPartial } from '../modelo/automovil';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private URL_API = 'http://200.112.69.224:3000/automovil-carrito';
  Automoviles: any;
  cart=[];
  private paginaActual = 1;
  private listaAutosCarrito = new BehaviorSubject<Array<AutomovilID>>([]);
  public listaAutosCarrito$ = this.listaAutosCarrito.asObservable();
  constructor(private cliente: HttpClient) { }

  public añadirAutosCarrito( auto ){
      return this.cliente.post<Array<Automovil>[]>(`${this.URL_API}`,auto).subscribe( res =>{
         this.cart.push(auto);
      })
  }

  public ObtenerAutosCarrito(){
    return this.cliente.get<Array<AutomovilID>>(`${this.URL_API}?
    _page=1`)
    .subscribe(datos =>{
      this.paginaActual= this.paginaActual+1;
      this.listaAutosCarrito.next(datos)
    });
  }

  public eliminarAutosCarrito(id: number): Observable<any>{
    return this.cliente.delete(`${this.URL_API}/${id}`)
  }
  public listarAutosCarrito(){
    return this.cliente.get(`${this.URL_API}`);
  }
}
