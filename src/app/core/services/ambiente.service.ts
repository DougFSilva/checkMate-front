import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/API_CONFIG';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Ambiente, PaginaAmbientes } from '../types/AmbienteResponse';
import { AmbienteForm } from '../types/AmbienteForm';

@Injectable({
  providedIn: 'root'
})
export class AmbienteService {

  private http = inject(HttpClient);

  criarAmbiente(form: AmbienteForm): Observable<Ambiente> {
    return this.http.post<Ambiente>(`${API_CONFIG.baseUrl}/ambientes`, form);
  }

  editarAmbiente(id: number, form: AmbienteForm): Observable<Ambiente> {
    return this.http.put<Ambiente>(`${API_CONFIG.baseUrl}/ambientes/${id}`, form);
  }

  deletarAmbiente(id: number): Observable<void> {
    return this.http.delete<void>(`${API_CONFIG.baseUrl}/ambientes/${id}`);
  }

  alterarImagemAmbiente(id: number, file: FormData) : Observable<Ambiente> {
    return this.http.post<Ambiente>(`${API_CONFIG.baseUrl}/ambientes/imagem/ ${id}`, file);
  }

  buscarAmbientePeloId(id: number): Observable<Ambiente> {
    return this.http.get<Ambiente>(`${API_CONFIG.baseUrl}/ambientes/${id}`);
  }

  buscarTodosAmbientes(page: number, size: number ): Observable<PaginaAmbientes> {
    const params = new HttpParams()
    .set('page', page)
    .set('size', size)
    .set('sort', 'nome,asc')
    return this.http.get<PaginaAmbientes>(
      `${API_CONFIG.baseUrl}/ambientes`, {params}
    );
  }

  buscarAmbientesPorNome(nome: string, page: number, size: number): Observable<PaginaAmbientes> {
    const params = new HttpParams()
    .set('page', page)
    .set('size', size)
    .set('nome', nome)
    .set('sort', 'nome,asc')
    return this.http.get<PaginaAmbientes>(
      `${API_CONFIG.baseUrl}/ambientes/nome`, {params})
  }

 
}
