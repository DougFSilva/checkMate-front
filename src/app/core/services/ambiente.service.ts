import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/API_CONFIG';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AmbienteResumo, AmbienteDetalhado } from '../types/AmbienteResponse';
import { AmbienteForm } from '../types/AmbienteForm';
import { Pagina } from '../types/Pagina';

@Injectable({
  providedIn: 'root'
})
export class AmbienteService {

  private http = inject(HttpClient);
  private baseUrl = API_CONFIG.baseUrl + '/ambientes';

  criarAmbiente(form: AmbienteForm): Observable<AmbienteResumo> {
    return this.http.post<AmbienteResumo>(`${this.baseUrl}`, form);
  }

  editarAmbiente(id: number, form: AmbienteForm): Observable<AmbienteResumo> {
    return this.http.put<AmbienteResumo>(`${this.baseUrl}/${id}`, form);
  }

  deletarAmbiente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  alterarImagemAmbiente(id: number, file: FormData) : Observable<AmbienteResumo> {
    return this.http.post<AmbienteResumo>(`${this.baseUrl}/imagem/ ${id}`, file);
  }

  buscarAmbientePeloId(id: number): Observable<AmbienteDetalhado> {
    return this.http.get<AmbienteDetalhado>(`${this.baseUrl}/${id}`);
  }

  buscarTodosAmbientes(pagina: number, itensPorPagina: number ): Observable<Pagina<AmbienteResumo>> {
    const params = new HttpParams()
    .set('page', pagina)
    .set('size', itensPorPagina)
    .set('sort', 'nome,asc')
    return this.http.get<Pagina<AmbienteResumo>>(
      `${this.baseUrl}`, {params}
    );
  }

  buscarAmbientesPorNome(nome: string, page: number, size: number): Observable<Pagina<AmbienteResumo>> {
    const params = new HttpParams()
    .set('page', page)
    .set('size', size)
    .set('nome', nome)
    .set('sort', 'nome,asc')
    return this.http.get<Pagina<AmbienteResumo>>(
      `${this.baseUrl}/nome`, {params})
  }
}
