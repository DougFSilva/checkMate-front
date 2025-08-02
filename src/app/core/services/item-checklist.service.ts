import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_CONFIG } from '../../config/API_CONFIG';
import { ItemChecklistDetalhado, ItemChecklistResumo, PaginaItensChecklist } from '../types/ItemChecklistResponse';

@Injectable({
  providedIn: 'root'
})
export class ItemChecklistService {

  private http = inject(HttpClient);
  private baseUrl = API_CONFIG.baseUrl + '/itens-checklist';

  buscarItemChecklistPeloId(id: number): Observable<ItemChecklistDetalhado> {
    return this.http.get<ItemChecklistDetalhado>(`${this.baseUrl}/${id}`);
  }

  buscarItensChecklistPeloChecklistCompartimento(id: number): Observable<ItemChecklistResumo[]> {
    return this.http.get<ItemChecklistResumo[]>(`${this.baseUrl}/checklist-compartimento/${id}`);
  }

  buscarItensChecklistPeloItem(
    itemID: number, pagina: number, itensPorPagina: number): Observable<PaginaItensChecklist>{
    const params = new HttpParams()
      .set('page', pagina)
      .set('size', itensPorPagina)
      .set('sort', 'checkListCompartimento.dataHoraPreenchimentoEntrada,desc');
    return this.http.get<PaginaItensChecklist>(`${this.baseUrl}/item/${itemID}`, {params});
  }
  
}
