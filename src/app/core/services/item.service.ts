import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemDetalhado, ItemResumo, PaginaItens } from '../types/ItemResponse';
import { API_CONFIG } from '../../config/API_CONFIG';
import { ItemForm } from '../types/ItemForm';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private http = inject(HttpClient);

  criarItem(form: ItemForm): Observable<ItemResumo> {
    return this.http.post<ItemResumo>(`${API_CONFIG.baseUrl}/itens`, form);
  }

  deletarItem(id: number): Observable<void> {
    return this.http.delete<void>(`${API_CONFIG.baseUrl}/itens/${id}`)
  }

  editarItem(id: number, form: ItemForm): Observable<ItemResumo> {
    return this.http.put<ItemResumo>(`${API_CONFIG.baseUrl}/itens/${id}`, form);
  }

  alterarImagemItem(id: number, file: FormData) : Observable<ItemResumo> {
        return this.http.post<ItemResumo>(`${API_CONFIG.baseUrl}/itens/imagem/ ${id}`, file);
  }

  buscarItemPeloID(id: number) : Observable<ItemDetalhado> {
    return this.http.get<ItemDetalhado>(`${API_CONFIG.baseUrl}/itens/${id}`);
  }

  buscarItensPeloCompartimento(id: number, pagina: number, itensPorPagina: number): Observable<PaginaItens> {
    const params = new HttpParams()
    .set('page', pagina)
    .set('size', itensPorPagina)
    .set('sort', 'descricao,asc');
    return this.http.get<PaginaItens>(`${API_CONFIG.baseUrl}/itens/compartimento/${id}`, {params})
  }

  

}
