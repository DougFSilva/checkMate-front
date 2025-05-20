import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';

import { ContainerPrincipalComponent } from '../../shared/container-principal/container-principal.component';
import { PaginacaoComponent } from '../../shared/paginacao/paginacao.component';
import { CabecalhoAmbientesComponent } from './components/cabecalho-ambientes/cabecalho-ambientes.component';
import { AmbienteService } from '../../core/services/ambiente.service';
import { ToastrService } from 'ngx-toastr';
import { PaginaAmbientes } from '../../core/types/AmbienteResponse';
import { GridAmbientesComponent } from './components/grid-ambientes/grid-ambientes.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-ambientes',
  imports: [
    ContainerPrincipalComponent,
    MatInputModule,
    PaginacaoComponent,
    CabecalhoAmbientesComponent,
    GridAmbientesComponent
  ],
  templateUrl: './ambientes.component.html',
  styleUrl: './ambientes.component.css'
})
export class AmbientesComponent implements OnInit {

  private service = inject(AmbienteService);
  private toastr = inject(ToastrService);
  paginaAmbientes: PaginaAmbientes = {
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

  opcaoItensPorPagina: number[] = [15, 30, 50];
  pagina: number = 0;
  itensPorPagina: number = this.opcaoItensPorPagina[0];
  private nomeBuscaAtual: string = '';

  ngOnInit(): void {
    this.buscarAmbientesPeloNome('');
  }

  buscarAmbientesPeloNome(nome: string): void {
    this.nomeBuscaAtual = nome;
    this.service.buscarAmbientesPorNome(nome, this.pagina, this.itensPorPagina).subscribe(
      {
        next: (resposta) => {
          this.paginaAmbientes = resposta;
        },
        error: (err) => {
          console.error(err.error);
          this.toastr.error(`Erro ao bsucar ambientes: ${err.error.mensagens}`)
        }
      }
    )
  }

  atualizarPaginacao(event: PageEvent): void {
    this.pagina = event.pageIndex;
    this.itensPorPagina = event.pageSize;
    this.buscarAmbientesPeloNome(this.nomeBuscaAtual); 
  }
}
