import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_CONFIG } from '../../config/API_CONFIG';
import { ItemChecklistDetalhado } from '../types/ItemChecklistResponse';

@Injectable({
  providedIn: 'root'
})
export class ItemChecklistService {

  private http = inject(HttpClient);
  private baseUrl = API_CONFIG.baseUrl + '/itens-checklist';

  buscarItemChecklistPeloId(id: number): Observable<ItemChecklistDetalhado> {
    return this.http.get<ItemChecklistDetalhado>(`${this.baseUrl}/${id}`);
  }

  buscarItensChecklistPeloChecklistCompartimento(id: number): Observable<ItemChecklistDetalhado[]> {
    return this.http.get<ItemChecklistDetalhado[]>(`${this.baseUrl}/checklist-compartimento/${id}`);
  }
  
}
