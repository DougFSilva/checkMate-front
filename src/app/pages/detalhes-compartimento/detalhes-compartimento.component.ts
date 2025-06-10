import { Component, inject, OnInit } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

import { ContainerPrincipalComponent } from '../../shared/container-principal/container-principal.component';
import { CabecalhoDetalhesCompartimentoComponent } from "./components/cabecalho-detalhes-compartimento/cabecalho-detalhes-compartimento.component";
import { BotaoAddComponent } from '../../shared/botao-add/botao-add.component';
import { CompartimentoService } from '../../core/services/compartimento.service';
import { CompartimentoDetalhado } from '../../core/types/CompartimentoResponse';
import { PaginaItens } from '../../core/types/ItemResponse';
import { ItemService } from '../../core/services/item.service';
import { CriarItemComponent } from '../../shared/item/criar-item/criar-item.component';
import { GridItensCompartimentoComponent } from './components/grid-itens-compartimento/grid-itens-compartimento.component';

@Component({
  selector: 'app-detalhes-compartimento',
  imports: [
    ContainerPrincipalComponent,
    CabecalhoDetalhesCompartimentoComponent,
    BotaoAddComponent,
    GridItensCompartimentoComponent,
    MatPaginatorModule
],
  templateUrl: './detalhes-compartimento.component.html',
  styleUrl: './detalhes-compartimento.component.css'
})
export class DetalhesCompartimentoComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private toast = inject(ToastrService);
  private dialog = inject(MatDialog);
  private compartimentoService = inject(CompartimentoService);
  private itemService = inject(ItemService);
  opcaoItensPorPagina: number[] = [12, 24, 50];
  pagina: number = 0;
  itensPorPagina: number = this.opcaoItensPorPagina[0];
  compartimento: CompartimentoDetalhado = {
    id: 0,
    codigo: '',
    nome: '',
    descricao: '',
    imagem: '',
    ambiente: {
      id: 0, 
      nome: '', 
      descricao: '',
      localizacao: '',
      imagem: ''
    }, 
    contagemItens: 0
  }
  paginaItens: PaginaItens = {
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

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.compartimento.id = Number(id);
        this.buscarCompartimentoPeloID();
        this.buscarItensPeloCompartimento();
        return;
      }
      this.toast.error('ID do compartimento não encontrado na rota.');
    })
  }

  buscarCompartimentoPeloID(): void {
    this.compartimentoService.buscarCompartimentoPeloId(this.compartimento.id).subscribe(
      {
        next: (resposta) => {
          this.compartimento = resposta;
        },
        error: (err) => {
          this.toast.error(
            `Erro ao buscar compartimento: ${err.error.mensagens} `, 'ERRO');
        }
      }
    )
  }

  buscarItensPeloCompartimento(): void {
    this.itemService.buscarItensPeloCompartimento(
      this.compartimento.id, this.pagina, this.itensPorPagina).subscribe(
    {
      next: (resposta) => {
        this.paginaItens = resposta;
      },
      error: (err) => {
        this.toast.error(`Erro ao buscar itens: ${err.error.mensagens}`);
      }

    })
  }

  atualizarPaginacao(event: PageEvent): void {
    this.pagina = event.pageIndex;
    this.itensPorPagina = event.pageSize
    this.buscarItensPeloCompartimento();
  }

  abrirDialogCriarItem(): void {
    const dialog = this.dialog.open(CriarItemComponent, 
      {data: {'id': this.compartimento.id}});
    dialog.afterClosed().subscribe({
      next: (resposta) => {
        if (resposta) this.buscarItensPeloCompartimento();
      }
    });
  }
}

