import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CompartimentoDetalhado, CompartimentoResumo, PaginaCompartimentos } from '../types/CompartimentoResponse';
import { API_CONFIG } from '../../config/API_CONFIG';
import { CompartimentoForm } from '../types/CompartimentoForm';

@Injectable({
  providedIn: 'root'
})
export class CompartimentoService {

  private http = inject(HttpClient);
  private baseUrl = API_CONFIG.baseUrl + '/compartimentos'

  criarCompartimento(form: CompartimentoForm): Observable<CompartimentoResumo> {
    return this.http.post<CompartimentoResumo>(`${this.baseUrl}`, form);
  }

  deletarCompartimento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  editarCompartimento(id: number, form: CompartimentoForm): Observable<CompartimentoResumo> {
    return this.http.put<CompartimentoResumo>(`${this.baseUrl}/${id}`, form);
  }

  alterarImagemCompartimento(id: number, file: FormData) : Observable<CompartimentoResumo> {
      return this.http.post<CompartimentoResumo>(`${this.baseUrl}/imagem/ ${id}`, file);
  }

  buscarCompartimentoPeloId(id: number) : Observable<CompartimentoDetalhado> {
    return this.http.get<CompartimentoDetalhado>(`${this.baseUrl}/${id}`);
  }

  buscarCompartimentosPeloAmbiente(id: number, pagina:number, itensPorPagina:number): Observable<PaginaCompartimentos> {
    const params = new HttpParams()
    .set('page', pagina)
    .set('size', itensPorPagina)
    .set('sort', 'nome,asc');
    return this.http.get<PaginaCompartimentos>(
      `${this.baseUrl}/ambiente/${id}`, {params});
  }

  buscarTodosCompartimentos(pagina:number, itensPorPagina:number): Observable<PaginaCompartimentos> {
    const params = new HttpParams()
    .set('page', pagina)
    .set('size', itensPorPagina)
    .set('sort', 'nome,asc');
    return this.http.get<PaginaCompartimentos>(
      `${this.baseUrl}`, {params});
  }

}

