import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ContainerPrincipalComponent } from '../../shared/container-principal/container-principal.component';
import { CabecalhoDetalhesAmbienteComponent } from './components/cabecalho-detalhes-ambiente/cabecalho-detalhes-ambiente.component';
import { GridCompartimentosAmbienteComponent } from "./components/grid-compartimentos-ambiente/grid-compartimentos-ambiente.component";
import { CompartimentoService } from '../../core/services/compartimento.service';
import { AmbienteService } from '../../core/services/ambiente.service';
import { AmbienteDetalhado } from '../../core/types/AmbienteResponse';
import { CriarCompartimentoComponent } from '../../shared/compartimento/criar-compartimento/criar-compartimento.component';
import { BotaoAcaoComponent } from '../../shared/botao-acao/botao-acao.component';
import { Pagina } from '../../core/types/Pagina';
import { CompartimentoResumo } from '../../core/types/CompartimentoResponse';
import { TituloComponent } from "../../shared/titulo/titulo.component";

@Component({
  selector: 'app-detalhes-ambiente',
  imports: [
    ContainerPrincipalComponent,
    CabecalhoDetalhesAmbienteComponent,
    GridCompartimentosAmbienteComponent,
    MatPaginatorModule,
    BotaoAcaoComponent,
    TituloComponent
],
  templateUrl: './detalhes-ambiente.component.html',
  styleUrl: './detalhes-ambiente.component.css'
})
export class DetalhesAmbienteComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private toast = inject(ToastrService);
  private dialog = inject(MatDialog);
  private ambienteService = inject(AmbienteService);
  private compartimentoService = inject(CompartimentoService);
  opcaoItensPorPagina: number[] = [12, 24, 50];
  pagina: number = 0;
  itensPorPagina: number = this.opcaoItensPorPagina[0];
  ambiente: Partial<AmbienteDetalhado> = {};
  paginaCompartimentos: Partial<Pagina<CompartimentoResumo>> = {};

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
    this.ambienteService.buscarAmbientePeloId(this.ambiente.id!).subscribe(
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
      this.ambiente.id!, this.pagina, this.itensPorPagina).subscribe(
    {
      next: (resposta) => {
        this.paginaCompartimentos = resposta;
      },
      error: (err) => {
        this.toast.error(`Erro ao buscar compartimentos: ${err.error.mensagens}`);
        console.error(err);
      }

    })
  }

  atualizarPaginacao(event: PageEvent): void {
    this.pagina = event.pageIndex;
    this.itensPorPagina = event.pageSize
    this.buscarCompartimentosPeloAmbiente();
  }

  abrirDialogCriarCompartimento(): void {
    const dialog = this.dialog.open(CriarCompartimentoComponent, 
      {data: {'id': this.ambiente.id}});
    dialog.afterClosed().subscribe({
      next: (resposta) => {
        if (resposta) {
          this.buscarCompartimentosPeloAmbiente();
          this.buscarAmbientePeloID();
        }
      }
    });
  }
}
