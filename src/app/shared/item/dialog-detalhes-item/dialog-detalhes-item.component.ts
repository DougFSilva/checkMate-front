import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../../../core/services/websocket.service';

import { ItemDetalhado } from '../../../core/types/ItemResponse';
import { PaginaEmprestimosDetalhado } from '../../../core/types/EmprestimoResponse';
import { ItemService } from '../../../core/services/item.service';
import { TabelaEmprestimosItemComponent } from "../tabela-emprestimos-item/tabela-emprestimos-item.component";
import { EmprestimoService } from '../../../core/services/emprestimo.service';
import { PaginaItensChecklist } from '../../../core/types/ItemChecklistResponse';
import { ItemChecklistService } from '../../../core/services/item-checklist.service';
import { GridItemchecklistComponent } from "../../../pages/detalhes-item/components/grid-itemchecklist/grid-itemchecklist.component";

@Component({
  selector: 'app-dialog-detalhes-item',
  imports: [
    MatIconModule,
    TabelaEmprestimosItemComponent,
    MatPaginatorModule,
    MatTabsModule,
    GridItemchecklistComponent
],
  templateUrl: './dialog-detalhes-item.component.html',
  styleUrl: './dialog-detalhes-item.component.css'
})
export class DialogDetalhesItemComponent implements OnInit, OnDestroy {
  
  private service = inject(ItemService);
  private emprestimoService = inject(EmprestimoService);
  private itemChecklistService = inject(ItemChecklistService);
  public dialogRef = inject(MatDialogRef<DialogDetalhesItemComponent>);
  private toast = inject(ToastrService);
  private websocketService = inject(WebsocketService);
  private subscription = new Subscription();
  data: any = inject(MAT_DIALOG_DATA);

  item: ItemDetalhado = {
      id: 0,
      compartimento: {
        id: 0,
        codigo: '',
        nome: '',
        descricao: '',
        imagem: ''
      },
      descricao: '',
      quantidade: 0,
      verificavel: false,
      imagem: ''
    }
  
    emprestimos: PaginaEmprestimosDetalhado = {
      content: [],
      pageable: {
        pageNumber: 0,
        pageSize: 0,
        sort: {
          sorted: false,
          unsorted: true,
          empty: true,
        },
        offset: 0,
        paged: false,
        unpaged: true,
      },
      totalElements: 0,
      totalPages: 0,
      last: true,
      first: true,
      numberOfElements: 0,
      size: 0,
      number: 0,
      sort: {
        sorted: false,
        unsorted: true,
        empty: true,
      },
      empty: true,
  }
  opcaoItensPorPaginaEmprestimos: number[] = [10, 20, 30];
  paginaEmprestimos: number = 0;
  itensPorPaginaEmprestimos: number = this.opcaoItensPorPaginaEmprestimos[0];

  historicoChecklist: PaginaItensChecklist = {
      content: [],
      pageable: {
        pageNumber: 0,
        pageSize: 0,
        sort: {
          sorted: false,
          unsorted: true,
          empty: true,
        },
        offset: 0,
        paged: false,
        unpaged: true,
      },
      totalElements: 0,
      totalPages: 0,
      last: true,
      first: true,
      numberOfElements: 0,
      size: 0,
      number: 0,
      sort: {
        sorted: false,
        unsorted: true,
        empty: true,
      },
      empty: true,
    }
    opcaoItensPorPaginaHistoricoChecklist: number[] = [5, 10, 20];
    paginaHistoricoChecklist: number = 0;
    itensPorPaginaHistoricoChecklist: number = this.opcaoItensPorPaginaHistoricoChecklist[0];

  ngOnInit(): void {
    this.item.id = this.data.id;
    this.buscarItem();
    this.buscarEmprestimosDoItem();
    this.buscarHistoricoChecklist();
    this.inscreverWs();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  inscreverWs(): void {
    this.subscription.add(this.websocketService.emprestimo$.subscribe({
      next: () => {
        this.buscarEmprestimosDoItem();
      },
       error: (err) => {
        this.toast.error('Erro de inscrição no tópico empréstimos. Tente recarregar a página.', 'ERRO');
        console.error('WebSocket Error:', err);
      }
    }))
  }

  buscarItem(): void {
    this.service.buscarItemPeloID(this.item.id).subscribe({
      next: (resposta) => {
        this.item = resposta;
      },
      error: (err) => {
        this.toast.error(`Erro ao buscar datalhes do item: ${err.error.mensagens}`, 'ERRO');
      }
    })
  }

  buscarEmprestimosDoItem(): void {
    this.emprestimoService.buscarEmprestimosPeloItem(
      this.item.id, this.paginaEmprestimos, this.itensPorPaginaEmprestimos).subscribe({
        next: (resposta) => {
          this.emprestimos = resposta;
        },
        error: (err) => {
          this.toast.error(`Erro ao buscar empréstimos do item: ${err.error.mensagens}, 'ERRO`)
        }
    })
  }

  atualizarPaginacaoEmprestimos(event: PageEvent): void {
    this.paginaEmprestimos = event.pageIndex;
    this.itensPorPaginaEmprestimos = event.pageSize;
    this.buscarEmprestimosDoItem();
  }

  buscarHistoricoChecklist(): void {
    this.itemChecklistService.buscarItensChecklistPeloItem(
      this.item.id, 
      this.paginaHistoricoChecklist, 
      this.itensPorPaginaHistoricoChecklist).subscribe({
        next: (resposta) => {
          this.historicoChecklist = resposta;
        },
        error: (err) => {
          this.toast.error(`Erro ao buscar histórico de check-list do item: ${err.error.mensagens}`, 'ERRO');
        }
      })
  }

  atualizarPaginacaoHistoricoChecklist(event: PageEvent): void {
    this.paginaHistoricoChecklist = event.pageIndex;
    this.itensPorPaginaHistoricoChecklist = event.pageSize;
    this.buscarHistoricoChecklist();
  }

}
