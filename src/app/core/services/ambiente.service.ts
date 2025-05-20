import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/API_CONFIG';
import { HttpClient } from '@angular/common/http';
import { PaginaAmbientes } from '../types/AmbienteResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AmbienteService {

  private http = inject(HttpClient);

  buscarTodosAmbientes(page: number, size: number ): Observable<PaginaAmbientes> {
    return this.http.get<PaginaAmbientes>(
      `${API_CONFIG.baseUrl}/ambientes?page=${page}&size=${size}`
    );
  }

  buscarAmbientesPorNome(nome: string, page: number, size: number): Observable<PaginaAmbientes> {
    return this.http.get<PaginaAmbientes>(
      `${API_CONFIG.baseUrl}/ambientes/nome?nome=${nome}&page=${page}&size=${size}`)
  }

  deletarAmbiente(id: number): Observable<void> {
    return this.http.delete<void>(`${API_CONFIG.baseUrl}/ambientes/${id}`);
  }
}
