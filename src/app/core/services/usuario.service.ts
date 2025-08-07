import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/API_CONFIG';
import { PaginaUsuarios } from '../types/UsuarioResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private http = inject(HttpClient);
  private baseUrl = API_CONFIG.baseUrl + '/usuarios'

  buscarUsuariosPeloPerfil(perfil: string, pagina: number, itensPorPagina: number): Observable<PaginaUsuarios> {
    const params = new HttpParams()
    .set('page', pagina)
    .set('size', itensPorPagina)
    .set('sort', 'nome,asc');
    return this.http.get<PaginaUsuarios>(`${this.baseUrl}/perfil/${perfil}`, {params})
  }

  buscarTodosUsuarios(pagina: number, itensPorPagina: number): Observable<PaginaUsuarios> {
    const params = new HttpParams()
    .set('page', pagina)
    .set('size', itensPorPagina)
    .set('sort', 'nome,asc');
    return this.http.get<PaginaUsuarios>(`${this.baseUrl}`, {params})
  }
}
