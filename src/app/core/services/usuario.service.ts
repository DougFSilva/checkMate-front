import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/API_CONFIG';
import { Observable } from 'rxjs';
import { Pagina } from '../types/Pagina';
import { UsuarioResponse } from '../types/UsuarioResponse';
import { UsuarioForm } from '../types/UsuarioForm';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private http = inject(HttpClient);
  private baseUrl = API_CONFIG.baseUrl + '/usuarios'

  cadastrarUsuario(form: UsuarioForm): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}`, form);
  }

  editarUsuario(id: number, form: UsuarioForm): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, form);
  }

  deletarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  buscarUsuarioPeloID(id: number): Observable<UsuarioResponse> {
    return this.http.get<UsuarioResponse>(`${this.baseUrl}/${id}`);
  }

  buscarUsuariosPeloNome(nome: string, pagina: number, itensPorPagina: number): Observable<Pagina<UsuarioResponse>> {
    const params = new HttpParams()
    .set('page', pagina)
    .set('size', itensPorPagina)
    .set('sort', 'nome,asc');
    return this.http.get<Pagina<UsuarioResponse>>(`${this.baseUrl}/nome/${nome}`, {params})
  }

  buscarUsuariosPeloPerfil(perfil: string, pagina: number, itensPorPagina: number): Observable<Pagina<UsuarioResponse>> {
    const params = new HttpParams()
    .set('page', pagina)
    .set('size', itensPorPagina)
    .set('sort', 'nome,asc');
    return this.http.get<Pagina<UsuarioResponse>>(`${this.baseUrl}/perfil/${perfil}`, {params})
  }

  buscarTodosUsuarios(pagina: number, itensPorPagina: number): Observable<Pagina<UsuarioResponse>> {
    const params = new HttpParams()
    .set('page', pagina)
    .set('size', itensPorPagina)
    .set('sort', 'nome,asc');
    return this.http.get<Pagina<UsuarioResponse>>(`${this.baseUrl}`, {params})
  }
}
