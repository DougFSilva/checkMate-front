import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ContainerPrincipalComponent } from '../../shared/container-principal/container-principal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CabecalhoDetalhesAmbienteComponent } from './components/cabecalho-detalhes-ambiente/cabecalho-detalhes-ambiente.component';
import { GridCompartimentosAmbienteComponent } from "./components/grid-compartimentos-ambiente/grid-compartimentos-ambiente.component";
import { CompartimentoService } from '../../core/services/compartimento.service';
import { AmbienteService } from '../../core/services/ambiente.service';
import { AmbienteDetalhado } from '../../core/types/AmbienteResponse';
import { PaginaCompartimentos } from '../../core/types/CompartimentoResponse';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-detalhes-ambiente',
  imports: [
    ContainerPrincipalComponent,
    MatButtonModule,
    MatIconModule,
    CabecalhoDetalhesAmbienteComponent,
    GridCompartimentosAmbienteComponent,
    MatPaginatorModule,
  ],
  templateUrl: './detalhes-ambiente.component.html',
  styleUrl: './detalhes-ambiente.component.css'
})
export class DetalhesAmbienteComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private toast = inject(ToastrService);
  private ambienteService = inject(AmbienteService);
  private compartimentoService = inject(CompartimentoService);
  opcaoItensPorPagina: number[] = [12, 24, 50];
  pagina: number = 0;
  itensPorPagina: number = this.opcaoItensPorPagina[0];
  ambiente: AmbienteDetalhado = {
    id: 0,
    nome: '',
    descricao: '',
    localizacao: '',
    imagem: '',
    contagemCompartimentos: 0,
    contagemItens: 0
  }
  paginaCompartimentos: PaginaCompartimentos = {
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
        this.ambiente.id = Number(id);
        this.buscarAmbientePeloID();
        this.buscarCompartimentosPeloAmbiente();
        return;
      }
      this.toast.error('ID do ambiente não encontrado na rota.');
    })
  }

  buscarAmbientePeloID(): void {
    this.ambienteService.buscarAmbientePeloId(this.ambiente.id).subscribe(
      {
        next: (resposta) => {
          this.ambiente = resposta;
        },
        error: (err) => {
          this.toast.error(
            `Erro ao buscar ambiente: ${err.error.mensagens} `, 'ERRO');
        }
      }
    )
  }

  buscarCompartimentosPeloAmbiente(): void {
    this.compartimentoService.buscarCompartimentosPeloAmbiente(
      this.ambiente.id, this.pagina, this.itensPorPagina).subscribe(
    {
      next: (resposta) => {
        this.paginaCompartimentos = resposta;
      },
      error: (err) => {
        this.toast.error(`Erro ao buscar compartimentos: ${err.error.mensagens}`);
      }

    })
  }

  atualizarPaginacao(event: PageEvent): void {
    this.pagina = event.pageIndex;
    this.itensPorPagina = event.pageSize
    this.buscarCompartimentosPeloAmbiente();
  }

}
