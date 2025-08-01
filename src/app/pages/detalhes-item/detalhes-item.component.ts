import { Component, inject, OnInit } from '@angular/core';
import { ContainerPrincipalComponent } from "../../shared/container-principal/container-principal.component";
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Location } from '@angular/common';

import { ItemService } from '../../core/services/item.service';
import { ItemDetalhado } from '../../core/types/ItemResponse';
import { InfoItemComponent } from "./components/info-item/info-item.component";
import { EmprestimoService } from '../../core/services/emprestimo.service';
import { PaginaEmprestimosDetalhado } from '../../core/types/EmprestimoResponse';
import { TabelaEmprestimosItemComponent } from "../../shared/item/tabela-emprestimos-item/tabela-emprestimos-item.component";

@Component({
  selector: 'app-detalhes-item',
  imports: [
    ContainerPrincipalComponent,
    MatIconModule,
    InfoItemComponent,
    MatPaginatorModule,
    TabelaEmprestimosItemComponent
],
  templateUrl: './detalhes-item.component.html',
  styleUrl: './detalhes-item.component.css'
})
export class DetalhesItemComponent implements OnInit {

  private service = inject(ItemService);
  private emprestimoService = inject(EmprestimoService);
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private toast = inject(ToastrService);

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

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.item.id = Number(id);
        this.buscarItemPeloId();
        this.buscarEmprestimosDoItem();
        return;
      }
      this.toast.error('ID do item não encontrado na rota.');
    })
  }

  buscarItemPeloId() {
    this.service.buscarItemPeloID(this.item.id).subscribe(
      {
        next: (resultado) => {
          this.item = resultado;
        },
        error: (err) => {
          this.toast.error(`Erro ao buscar item: ${err.error.mensagens}`, 'ERRO');
        }
      }
    )
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

  navegarParaPaginaAnterior(): void {
    this.location.back();
  }

}
