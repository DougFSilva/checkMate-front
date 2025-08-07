import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/API_CONFIG';
import { Observable } from 'rxjs';
import { PaginaEmprestimosDetalhado } from '../types/EmprestimoResponse';
import { EmprestimoForm } from '../types/EmprestimoForm';

@Injectable({
  providedIn: 'root'
})
export class EmprestimoService {

  private http = inject(HttpClient);
  private baseUrl = API_CONFIG.baseUrl + '/emprestimos'

  emprestarItem(form: EmprestimoForm): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/emprestar`, form);
  }

  devolverItem(itemID: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/devolver/${itemID}`, {});
  }

  buscarEmprestimosPeloItem(
    itemID: number, pagina: number, itensPorPagina: number): Observable<PaginaEmprestimosDetalhado>{
    const params = new HttpParams()
      .set('page', pagina)
      .set('size', itensPorPagina)
      .set('sort', 'dataHoraEmprestimo,desc');
    return this.http.get<PaginaEmprestimosDetalhado>(`${this.baseUrl}/item/${itemID}`, {params});
  }
}
