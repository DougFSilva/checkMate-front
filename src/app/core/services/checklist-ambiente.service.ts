import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckListAmbienteDetalhado, PaginaCheckListAmbiente } from '../types/CheckListAmbienteResponse';
import { API_CONFIG } from '../../config/API_CONFIG';

@Injectable({
  providedIn: 'root'
})
export class ChecklistAmbienteService {

  private http = inject(HttpClient);
  private baseUrl = API_CONFIG.baseUrl + '/checklists-ambiente'

  abrirChecklistDeAmbiente(id: number): Observable<CheckListAmbienteDetalhado> {
    return this.http.post<CheckListAmbienteDetalhado>(`${this.baseUrl}/${id}`, {});
  }

  liberarChecklistDeAmbiente(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/liberar/${id}`, {});
  }

  encerrarChecklistDeAmbiente(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/encerrar/${id}`, {});
  }

  deletarChecklistDeAmbiente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  buscarChecklistDeAmbientePeloId(id: number): Observable<CheckListAmbienteDetalhado> {
    return this.http.get<CheckListAmbienteDetalhado>(`${this.baseUrl}/${id}`)
  }

  buscarChecklistDeAmbientePeloAmbiente(
    ambienteId: number, 
    pagina: number, 
    itensPorPagina: number
  ): Observable<PaginaCheckListAmbiente> {
     const params = new HttpParams()
      .set('page', pagina)
      .set('size', itensPorPagina)
      .set('sort', 'status,asc')
      .append('sort', 'dataHoraEncerramento,desc')
    return this.http.get<PaginaCheckListAmbiente>(`${this.baseUrl}/ambiente/${ambienteId}`, {params});
  }

  buscarCheckListsDeAmbientePeloAmbienteEStatus (
    ambienteId: number, 
    status: string,
    pagina: number, 
    itensPorPagina: number
  ): Observable<PaginaCheckListAmbiente> {
     let params = new HttpParams()
      .set('page', pagina)
      .set('size', itensPorPagina);
      switch (status) {
        case 'ABERTO':
          params = params.set('sort', 'dataHoraAbertura,desc')
          break;
        case 'LIBERADO':
          params = params.set('sort', 'dataHoraLiberacao,desc')
          break;
        case 'ENCERRADO':
          params = params.set('sort', 'dataHoraEncerramento,desc')
          break;
      }
    return this.http.get<PaginaCheckListAmbiente>(`${this.baseUrl}/ambiente/${ambienteId}/status/${status}`, {params});
  }

  buscarCheckListsDeAmbientePelaDataHoraAbertura (
    dataInicial: Date,
    dataFinal: Date,
    pagina: number, 
    itensPorPagina: number
  ): Observable<PaginaCheckListAmbiente> {
     let params = new HttpParams()
      .set('data-inicial', dataInicial.toISOString().replace("Z", ""))
      .set('data-final', dataFinal.toISOString().replace("Z", ""))
      .set('page', pagina)
      .set('size', itensPorPagina)
      .set('sort', 'dataHoraAbertura,desc')
    return this.http.get<PaginaCheckListAmbiente>(`${this.baseUrl}/data-hora-abertura`, {params});
  }

  buscarCheckListsDeAmbientePeloAmbienteEDataEncerramento (
    ambienteId: number, 
    dataInicial: Date,
    dataFinal: Date,
    pagina: number, 
    itensPorPagina: number
  ): Observable<PaginaCheckListAmbiente> {
     let params = new HttpParams()
      .set('data-inicial', dataInicial.toISOString().replace("Z", ""))
      .set('data-final', dataFinal.toISOString().replace("Z", ""))
      .set('page', pagina)
      .set('size', itensPorPagina)
      .set('sort', 'dataHoraEncerramento,desc')
    return this.http.get<PaginaCheckListAmbiente>(`${this.baseUrl}/ambiente/${ambienteId}/data-hora-encerramento`, {params});
  }

}
