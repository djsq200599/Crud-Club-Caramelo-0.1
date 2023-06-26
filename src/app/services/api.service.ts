import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Automovil, AutomovilID, AutomovilPartial } from '../modelo/automovil';
import { delay } from 'rxjs/operators';
import { Calificaciones, CalificacionesID, CalificacionesPartial } from '../modelo/calificaciones';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private URL_API = 'http://localhost:3000/automovil';
  private URL_CALIFICACIONES = 'http://localhost:3000/calificaciones';
  private paginaActual = 1;
  private listaAutos = new BehaviorSubject<Array<AutomovilID>>([]);
  public listaAutos$ = this.listaAutos.asObservable();

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

  public obtenerCalificaciones(idAuto: number): Observable<CalificacionesID[]> {
    return this.cliente.get<CalificacionesID[]>(`${this.URL_CALIFICACIONES}?id=${idAuto}`);
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

  public modificarCalificacionPorID(id: number, calificacion: CalificacionesPartial): Observable<any> {
    return this.cliente.patch(`${this.URL_CALIFICACIONES}/${id}`, calificacion, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  }
}