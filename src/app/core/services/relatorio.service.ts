import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/API_CONFIG';
import { Observable } from 'rxjs';
import { RelatorioResumoGeral } from '../types/RelatorioResumoGeral';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  private http = inject(HttpClient);
  private baseUrl = API_CONFIG.baseUrl + '/relatorios';

  buscarRelatorioResumoGeral(): Observable<RelatorioResumoGeral>{
    return this.http.get<RelatorioResumoGeral>(`${this.baseUrl}/resumo-geral`);
  }
}
