import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PreencheCheckistForm } from '../types/PreencheChecklistForm';
import { API_CONFIG } from '../../config/API_CONFIG';
import { ChecklistCompartimentoDetalhado, ChecklistCompartimentoResumo } from '../types/ChecklistCompartimentoResponse';
import { Pagina } from '../types/Pagina';

@Injectable({
  providedIn: 'root'
})
export class ChecklistCompartimentoService {

  private http = inject(HttpClient);
  private baseUrl = API_CONFIG.baseUrl + '/checklists-compartimento'

  preencherChecklistEntrada(form: PreencheCheckistForm): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/preencher-entrada`, form);
  }

  preencherChecklistSaida(form: PreencheCheckistForm): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/preencher-saida`, form);
  }

  buscarCheckListCompartimentoPeloID(id: number): Observable<ChecklistCompartimentoDetalhado> {
    return this.http.get<ChecklistCompartimentoDetalhado>(`${this.baseUrl}/${id}`);
  }

  buscarCheckListCompartimentoPeloCheckListAmbiente(checklistAmbienteId: number)
  : Observable<ChecklistCompartimentoDetalhado[]> {
    return this.http.get<ChecklistCompartimentoDetalhado[]>(
      `${this.baseUrl}/check-list-ambiente/${checklistAmbienteId}`
    )
  }

  buscarTodosChecklistsCompartimento(): Observable<Pagina<ChecklistCompartimentoResumo>> {
    return this.http.get<Pagina<ChecklistCompartimentoResumo>>(`${this.baseUrl}`);
  }
}
