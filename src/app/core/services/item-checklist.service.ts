import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_CONFIG } from '../../config/API_CONFIG';
import { ItemChecklistDetalhado, ItemChecklistResumo } from '../types/ItemChecklistResponse';
import { Pagina } from '../types/Pagina';

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
    itemID: number, pagina: number, itensPorPagina: number): Observable<Pagina<ItemChecklistResumo>>{
    const params = new HttpParams()
      .set('page', pagina)
      .set('size', itensPorPagina)
      .set('sort', 'checkListCompartimento.dataHoraPreenchimentoEntrada,desc');
    return this.http.get<Pagina<ItemChecklistResumo>>(`${this.baseUrl}/item/${itemID}`, {params});
  }
  
}
