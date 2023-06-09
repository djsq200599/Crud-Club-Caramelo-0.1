import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Automovil, AutomovilID, AutomovilPartial } from '../modelo/automovil';
import { delay } from 'rxjs/operators';
import { Calificaciones, CalificacionesID, CalificacionesLocalID, CalificacionesPartial } from '../modelo/calificaciones';
import { Producto, ProductoID, ProductoPartial } from '../modelo/productos';
import { Musica, MusicaID, MusicaPartial } from '../modelo/musica';
import { Capacidad, CapacidadID, CapacidadPartial } from '../modelo/capacidad';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private URL_API = 'http://localhost:3000/automovil';
  private URL_CALIFICACIONES = 'http://localhost:3000/calificaciones';
  private URL_PRODUCTOS = 'https://special-succinct-cast.glitch.me/Productos';
  private URL_MUSICA = 'https://special-succinct-cast.glitch.me/Musica';
  private URL_CAPACIDAD = 'https://contador-personas-b48c4-default-rtdb.firebaseio.com/locales.json';
  private paginaActual = 1;
  private listaAutos = new BehaviorSubject<Array<AutomovilID>>([]);
  public listaAutos$ = this.listaAutos.asObservable();
  private listaMusica = new BehaviorSubject<Array<MusicaID>>([]);
  public listaMusica$ = this.listaMusica.asObservable();
  private listaProducto = new BehaviorSubject<Array<ProductoID>>([]);
  public listaProducto$ = this.listaProducto.asObservable();
  private listaCapacidad = new BehaviorSubject<Array<CapacidadID>>([]);
  public listaCapacidad$ = this.listaCapacidad.asObservable();
  private listaCalificaciones = new BehaviorSubject<Array<CalificacionesID>>([]);
  public listaCalificaciones$ = this.listaCalificaciones.asObservable();
  private listaCalificacionesLocal = new BehaviorSubject<Array<CalificacionesLocalID>>([]);
  public listaCalificacionesLocal$ = this.listaCalificacionesLocal.asObservable();

  constructor(private cliente: HttpClient) { }

  public obtenerAutos() {
    this.cliente.get<Array<AutomovilID>>(`${this.URL_API}?_page=1`)
      .pipe(
        delay(2000)
      )
      .subscribe(resultado => {
        this.paginaActual = this.paginaActual + 1;
        this.listaAutos.next(resultado);
      });
  }

  public obtenerMasAutos() {
    this.cliente.get<Array<AutomovilID>>(`${this.URL_API}?_page=${this.paginaActual}`)
      .pipe(
        delay(1000)
      )
      .subscribe(resultado => {
        this.paginaActual = this.paginaActual + 1;
        this.listaAutos.next(this.listaAutos.getValue().concat(resultado));
      });
  }

  public agregarAuto(payload: Automovil): Observable<AutomovilID> {
    return this.cliente.post<AutomovilID>(this.URL_API, payload, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  }

  public buscarPorID(id: number): Observable<AutomovilID | null> {
    return this.cliente.get<AutomovilID | null>(`${this.URL_API}/${id}`);
  }

  public borrarPorID(id: number): Observable<any> {
    return this.cliente.delete(`${this.URL_API}/${id}`);
  }

  public modificarPorID(id: number, payload: AutomovilPartial): Observable<any> {
    return this.cliente.patch(`${this.URL_API}/${id}`, payload, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  }

  public obtenerCalificaciones(): Observable<CalificacionesID[]> {
    return this.cliente.get<CalificacionesID[]>(this.URL_CALIFICACIONES);
  }

  public obtenerCalificacionesID(idcalif: number): Observable<CalificacionesID[]> {
    return this.cliente.get<CalificacionesID[]>(`${this.URL_CALIFICACIONES}?id=${idcalif}`);
  }

  public obtenerCalificacionesLocalID(idCalificacion: number): Observable<CalificacionesLocalID[]> {
    return this.cliente.get<CalificacionesLocalID[]>(`${this.URL_CALIFICACIONES}?id_calificacion=${idCalificacion}`);
  }

  public agregarCalificacion(calificacion: Calificaciones): Observable<CalificacionesID> {
    return this.cliente.post<CalificacionesID>(this.URL_CALIFICACIONES, calificacion, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  }

  public buscarCalificacionPorID(id: number): Observable<CalificacionesID | null> {
    return this.cliente.get<CalificacionesID | null>(`${this.URL_CALIFICACIONES}/${id}`);
  }

  public borrarCalificacionPorID(id: number): Observable<any> {
    return this.cliente.delete(`${this.URL_CALIFICACIONES}/${id}`);
  }

  public modificarCalificacionPorID(id: number, Calificacion: CalificacionesPartial): Observable<any> {
    return this.cliente.patch(`${this.URL_CALIFICACIONES}/${id}`, Calificacion, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  }

  public obtenerProductos() {
    this.cliente.get<Array<ProductoID>>(`${this.URL_PRODUCTOS}`)
      .pipe(
        delay(2000)
      )
      .subscribe(resultado => {
        this.paginaActual = this.paginaActual + 1;
        this.listaProducto.next(resultado);
      });
  }

  public agregarProductos(productos: Producto): Observable<ProductoID> {
    return this.cliente.post<ProductoID>(this.URL_PRODUCTOS, productos, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  }

  public buscarProductosPorID(id: number): Observable<ProductoID | null> {
    return this.cliente.get<ProductoID | null>(`${this.URL_PRODUCTOS}/${id}`);
  }

  public borrarProductosPorID(id: number): Observable<any> {
    return this.cliente.delete(`${this.URL_PRODUCTOS}/${id}`);
  }

  public modificarProductosPorID(id: number, productos: ProductoPartial): Observable<any> {
    return this.cliente.patch(`${this.URL_PRODUCTOS}/${id}`, productos, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  }


  public obtenerMusica() {
    this.cliente.get<Array<MusicaID>>(`${this.URL_MUSICA}`)
      .pipe(
        delay(2000)
      )
      .subscribe(resultado => {
        this.paginaActual = this.paginaActual + 1;
        this.listaMusica.next(resultado);
      });
  }

  public agregarMusica(Musica: Producto): Observable<MusicaID> {
    return this.cliente.post<MusicaID>(this.URL_MUSICA, Musica, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  }

  public buscarMusicaPorID(id: number): Observable<MusicaID | null> {
    return this.cliente.get<MusicaID | null>(`${this.URL_MUSICA}/${id}`);
  }

  public borrarMusicaPorID(id: number): Observable<any> {
    return this.cliente.delete(`${this.URL_MUSICA}/${id}`);
  }

  public modificarMusicaPorID(id: number, Musica: ProductoPartial): Observable<any> {
    return this.cliente.patch(`${this.URL_MUSICA}/${id}`, Musica, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  }

  public obtenerCapacidad() {
    this.cliente.get<Array<CapacidadID>>(`${this.URL_CAPACIDAD}`)
      .pipe(
        delay(2000)
      )
      .subscribe(resultado => {
        this.paginaActual = this.paginaActual + 1;
        this.listaCapacidad.next(resultado);
      });
  }

  public agregarCapacidad(Capacidad: Producto): Observable<CapacidadID> {
    return this.cliente.post<CapacidadID>(this.URL_CAPACIDAD, Capacidad, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  }

  public buscarCapacidadPorID(id: number): Observable<CapacidadID | null> {
    return this.cliente.get<CapacidadID | null>(`${this.URL_CAPACIDAD}/${id}`);
  }

  public borrarCapacidadPorID(id: number): Observable<any> {
    return this.cliente.delete(`${this.URL_CAPACIDAD}/${id}`);
  }

  public modificarCapacidadPorID(id: number, Capacidad: ProductoPartial): Observable<any> {
    return this.cliente.patch(`${this.URL_CAPACIDAD}/${id}`, Capacidad, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  }
}
