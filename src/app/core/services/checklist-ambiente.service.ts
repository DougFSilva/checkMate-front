import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChecklistAmbienteDetalhado, PaginaChecklistAmbiente } from '../types/CheckListAmbienteResponse';
import { API_CONFIG } from '../../config/API_CONFIG';

@Injectable({
  providedIn: 'root'
})
export class ChecklistAmbienteService {

  private http = inject(HttpClient);
  private baseUrl = API_CONFIG.baseUrl + '/checklists-ambiente'

  abrirChecklistDeAmbiente(id: number): Observable<ChecklistAmbienteDetalhado> {
    return this.http.post<ChecklistAmbienteDetalhado>(`${this.baseUrl}/${id}`, {});
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

  buscarChecklistDeAmbientePeloId(id: number): Observable<ChecklistAmbienteDetalhado> {
    return this.http.get<ChecklistAmbienteDetalhado>(`${this.baseUrl}/${id}`)
  }

  buscarChecklistDeAmbientePeloAmbiente(
    ambienteId: number, 
    pagina: number, 
    itensPorPagina: number
  ): Observable<PaginaChecklistAmbiente> {
     const params = new HttpParams()
      .set('page', pagina)
      .set('size', itensPorPagina)
      .set('sort', 'status,asc')
      .set('sort', 'dataHoraEncerramento, desc')
    return this.http.get<PaginaChecklistAmbiente>(`${this.baseUrl}/ambiente/${ambienteId}`, {params});
  }

  buscarCheckListsDeAmbientePeloAmbienteEStatus (
    ambienteId: number, 
    status: string,
    pagina: number, 
    itensPorPagina: number
  ): Observable<PaginaChecklistAmbiente> {
     const params = new HttpParams()
      .set('page', pagina)
      .set('size', itensPorPagina)
      .set('sort', 'dataHoraEncerramento,desc')
    return this.http.get<PaginaChecklistAmbiente>(`${this.baseUrl}/ambiente/${ambienteId}/status/${status}`, {params});
  }

}
