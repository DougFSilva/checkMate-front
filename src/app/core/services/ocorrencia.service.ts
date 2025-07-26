import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/API_CONFIG';
import { TrataOCorrencia } from '../types/TrataOcorrenciaForm';
import { Observable, Subject } from 'rxjs';
import { OcorrenciaDetalhado, PaginaOcorrencias } from '../types/OcorrenciaResponse';

@Injectable({
  providedIn: 'root'
})
export class OcorrenciaService {

  private http = inject(HttpClient);
  private baseUrl = API_CONFIG.baseUrl + '/ocorrencias'
  private atualizarStatusOcorrencias = new Subject<void>();
  atualizarStatusOcorrencias$ = this.atualizarStatusOcorrencias.asObservable();

  tratarOCorrencia(id: number, tratamento: TrataOCorrencia): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/tratar/${id}`, tratamento);
  }

  encerrarOCorrencia(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/encerrar/${id}`, {});
  }

  buscaOcorrenciaPeloId(id: number): Observable<OcorrenciaDetalhado> {
    return this.http.get<OcorrenciaDetalhado>(`${this.baseUrl}/${id}`);
  }

  buscarOcorrenciasPelaData (
    dataInicial: Date,
    dataFinal: Date,
    pagina: number, 
    itensPorPagina: number
  ): Observable<PaginaOcorrencias> {
     let params = new HttpParams()
      .set('data-inicial', dataInicial.toISOString().replace("Z", ""))
      .set('data-final', dataFinal.toISOString().replace("Z", ""))
      .set('page', pagina)
      .set('size', itensPorPagina)
      .set('sort', 'encerrada,asc')
      .append('sort', 'dataHora,desc');
    return this.http.get<PaginaOcorrencias>(`${this.baseUrl}/data`, {params});
  }

  buscarOcorrenciasPeloAmbienteEData (
    ambienteID: number,
    dataInicial: Date,
    dataFinal: Date,
    pagina: number, 
    itensPorPagina: number
  ): Observable<PaginaOcorrencias> {
     let params = new HttpParams()
      .set('ambienteID', ambienteID)
      .set('data-inicial', dataInicial.toISOString().replace("Z", ""))
      .set('data-final', dataFinal.toISOString().replace("Z", ""))
      .set('page', pagina)
      .set('size', itensPorPagina)
      .set('sort', 'encerrada,asc')
      .append('sort', 'dataHora,desc');
    return this.http.get<PaginaOcorrencias>(`${this.baseUrl}/ambiente-data`, {params});
  }

  buscarOcorrenciasPeloStatusEncerrada(
    encerrada: boolean,
    pagina: number,
    itensPorPagina: number
  ): Observable<PaginaOcorrencias> {
    let params = new HttpParams()
      .set('page', pagina)
      .set('size', itensPorPagina)
      .set('encerrada', encerrada)
      .set('sort', 'dataHora,desc')
    return this.http.get<PaginaOcorrencias>(`${this.baseUrl}/status`, {params});
  }

  buscarTodasOcorrencias (
    pagina: number, 
    itensPorPagina: number
  ): Observable<PaginaOcorrencias> {
     let params = new HttpParams()
      .set('page', pagina)
      .set('size', itensPorPagina)
      .set('sort', 'encerrada,asc')
      params = params.set('sort', 'dataHora,desc')
    return this.http.get<PaginaOcorrencias>(`${this.baseUrl}`, {params});
  }

  notificarAtualizacaoStatusOcorrencias(): void {
    this.atualizarStatusOcorrencias.next();
  }
}
