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

  deletarCompartimento(id: number): Observable<void> {
    return this.http.delete<void>(`${API_CONFIG.baseUrl}/compartimentos/${id}`);
  }

  editarCompartimento(id: number, form: CompartimentoForm): Observable<CompartimentoResumo> {
    return this.http.put<CompartimentoResumo>(`${API_CONFIG.baseUrl}/compartimentos/${id}`, form);
  }

  alterarImagemCompartimento(id: number, file: FormData) : Observable<CompartimentoResumo> {
      return this.http.post<CompartimentoResumo>(`${API_CONFIG.baseUrl}/compartimentos/imagem/ ${id}`, file);
    }

  buscarCompartimentoPeloId(id: number) : Observable<CompartimentoDetalhado> {
    return this.http.get<CompartimentoDetalhado>(`${API_CONFIG.baseUrl}/compartimentos/${id}`);
  }

  buscarCompartimentosPeloAmbiente(id: number, pagina:number, itensPorPagina:number): Observable<PaginaCompartimentos> {
    const params = new HttpParams()
    .set('page', pagina)
    .set('size', itensPorPagina)
    .set('sort', 'descricao,asc');
    return this.http.get<PaginaCompartimentos>(
      `${API_CONFIG.baseUrl}/compartimentos/ambiente/${id}`, {params});
  }

}

