import { Injectable } from '@angular/core';
import { Usuario, UsuarioPartial } from '../modelo/usuario';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, ObservableLike } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public URL_API="http://localhost:3000/usuario";
  constructor(private cliente: HttpClient) { }

  public agregarUsuario(payload: Usuario): Observable<UsuarioPartial> {
    return this.cliente.post<UsuarioPartial>(this.URL_API,payload,{
      headers:{
        'Content-Type':'application/json; charset=utf-8'
      }
    })
  }
}
