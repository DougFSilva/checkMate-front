import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../../core/services/websocket.service';

import { ChecklistAmbienteService } from '../../core/services/checklist-ambiente.service';
import { AmbienteDetalhado } from '../../core/types/AmbienteResponse';
import { AmbienteService } from '../../core/services/ambiente.service';
import { ConfirmacaoComponent } from '../../shared/dialog/confirmacao/confirmacao.component';
import { ContainerPrincipalComponent } from "../../shared/container-principal/container-principal.component";
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CabecalhoChecklistsAmbienteComponent } from './components/cabecalho-checklists-ambiente/cabecalho-checklists-ambiente.component';
import { GridChecklistsAmbienteComponent } from './components/grid-checklists-ambiente/grid-checklists-ambiente.component';
import { Pagina } from '../../core/types/Pagina';
import { CheckListAmbienteResumo } from '../../core/types/CheckListAmbienteResponse';
import { TituloComponent } from "../../shared/titulo/titulo.component";

@Component({
  selector: 'app-checklists-ambiente',
  imports: [
    ContainerPrincipalComponent,
    CabecalhoChecklistsAmbienteComponent,
    GridChecklistsAmbienteComponent,
    MatPaginatorModule,
    MatIconModule,
    MatTabsModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    TituloComponent
],
  templateUrl: './checklists-ambiente.component.html',
  styleUrl: './checklists-ambiente.component.css',
  providers: [provideNativeDateAdapter()]
})
export class ChecklistsAmbienteComponent implements OnInit, OnDestroy {

  private route = inject(ActivatedRoute);
  private toast = inject(ToastrService);
  private dialog = inject(MatDialog);
  private checkListService = inject(ChecklistAmbienteService);
  private ambienteService = inject(AmbienteService);
  private websocketService = inject(WebsocketService);
  private subscription = new Subscription();

  opcaoItensPorPaginaChecklistsAbertos = [10, 20, 40];
  itensPorPaginaChecklistsAbertos = this.opcaoItensPorPaginaChecklistsAbertos[0];
  paginaAtualChecklistsAbertos = 0;
  opcaoItensPorPaginaChecklistsLiberados = [10, 20, 40];
  itensPorPaginaChecklistsLiberados = this.opcaoItensPorPaginaChecklistsLiberados[0];
  paginaAtualChecklistsLiberados = 0;
  opcaoItensPorPaginaChecklistsEncerrados = [25, 50, 100];
  itensPorPaginaChecklistsEncerrados = this.opcaoItensPorPaginaChecklistsEncerrados[0];
  paginaAtualChecklistsEncerrados = 0;
  dataRange = new FormGroup({
    dataInicial: new FormControl<Date | null>(new Date(new Date().setFullYear(new Date().getFullYear() - 1))),
    dataFinal: new FormControl<Date | null>(new Date()),
  });

  ambiente: Partial<AmbienteDetalhado> = {};
  paginaChecklistsAbertos: Partial<Pagina<CheckListAmbienteResumo>> = {};
  paginaChecklistsLiberados: Partial<Pagina<CheckListAmbienteResumo>> = {};
  paginaChecklistsEncerrados: Partial<Pagina<CheckListAmbienteResumo>> = {};

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.ambiente.id = Number(id);
        this.buscarAmbientePeloId();
        this.buscarTodosChecklistsDoAmbiente();
        this.inscreverWs();
        return;
      }
      this.toast.error('ID do ambiente não encontrado na rota.');
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  inscreverWs(): void {
    this.subscription.add(this.websocketService.checklistAmbiente$.subscribe({
      next: (resposta) => { 
        if (resposta.body === 'CHECKLIST_AMBIENTE_ABERTO') {
          this.buscarCheckListsDeAmbienteAbertos();
        }
        else if (resposta.body === 'CHECKLIST_AMBIENTE_LIBERADO') {
          this.buscarCheckListsDeAmbienteAbertos();
          this.buscarCheckListsDeAmbienteLiberados();
        }
        else if (resposta.body === 'CHECKLIST_AMBIENTE_ENCERRADO') {
          this.buscarCheckListsDeAmbienteLiberados();
          this.buscarCheckListsDeAmbienteEncerrados();
        }
        else if (resposta.body === 'CHECKLIST_AMBIENTE_DELETADO') {
          this.buscarCheckListsDeAmbienteAbertos();
        }
      },
      error: (err) => {
        this.toast.error('Erro de inscrição no tópico checklist de ambientes. Tente recarregar a página.', 'ERRO');
        console.error('WebSocket Error:', err);
      }
    }));

  }

  buscarTodosChecklistsDoAmbiente(): void {
    this.buscarCheckListsDeAmbienteAbertos();
    this.buscarCheckListsDeAmbienteLiberados();
    this.buscarCheckListsDeAmbienteEncerrados();
  }

  abrirDialogAbrirChecklist(): void {
    const dialog = this.dialog.open(ConfirmacaoComponent,
      { data: { 'texto': `Deseja realmente abrir um novo checklist para o ambiente ${this.ambiente.nome!}` } });
    dialog.afterClosed().subscribe(
      {
        next: (resposta) => {
          if (resposta) this.abrirCheckList();
        }
      }
    )
  }

  abrirCheckList(): void {
    this.checkListService.abrirChecklistDeAmbiente(this.ambiente.id!).subscribe(
      {
        next: () => {
          this.toast.success(`Checklist aberto com sucesso`, 'SUCESSO');
        },
        error: (err) => {
          this.toast.error(`Erro ao abrir checklist do ambiente: ${err.error.mensagens}`, 'ERROR');
        }
      }
    )
  }

  buscarAmbientePeloId(): void {
    this.ambienteService.buscarAmbientePeloId(this.ambiente.id!).subscribe(
      {
        next: (resultado) => {
          this.ambiente = resultado;
        },
        error: (err) => {
          this.toast.error(`Erro ao buscar ambiente: ${err.error.mensagens}`);
        }
      }
    )
  }

  buscarCheckListsDeAmbienteAbertos(): void {
    this.checkListService.buscarCheckListsDeAmbientePeloAmbienteEStatus(
      this.ambiente.id!,
      'ABERTO',
      this.paginaAtualChecklistsAbertos,
      this.itensPorPaginaChecklistsAbertos).subscribe(
        {
          next: (resposta) => {
            this.paginaChecklistsAbertos = resposta;
          },
          error: (err) => {
            this.toast.error(`Erro ao buscar checklists de ambiente abertos: ${err.error.mensagens}`);
          }
        }
      )
  }

  buscarCheckListsDeAmbienteLiberados(): void {
    this.checkListService.buscarCheckListsDeAmbientePeloAmbienteEStatus(
      this.ambiente.id!,
      'LIBERADO',
      this.paginaAtualChecklistsLiberados,
      this.itensPorPaginaChecklistsLiberados).subscribe(
        {
          next: (resposta) => {
            this.paginaChecklistsLiberados = resposta;
          },
          error: (err) => {
            this.toast.error(`Erro ao buscar checklists de ambiente liberados: ${err.error.mensagens}`);
          }
        }
      )
  }

  buscarCheckListsDeAmbienteEncerrados(): void {
    const dataInicial = this.dataRange.get('dataInicial')!.value;
    const dataFinal = this.dataRange.get('dataFinal')!.value;
    if (dataInicial == null || dataFinal == null) {
      return;
    }
    this.checkListService.buscarCheckListsDeAmbientePeloAmbienteEDataEncerramento(
      this.ambiente.id!,
      dataInicial,
      dataFinal,
      this.paginaAtualChecklistsEncerrados,
      this.itensPorPaginaChecklistsEncerrados).subscribe(
        {
          next: (resposta) => {
            this.paginaChecklistsEncerrados = resposta;
          },
          error: (err) => {
            this.toast.error(`Erro ao buscar checklists de ambiente encerrados: ${err.error.mensagens}`);
          }
        }
      )
  }

  atualizarPaginacaoChecklistsAbertos(event: PageEvent): void {
    this.paginaAtualChecklistsAbertos = event.pageIndex;
    this.itensPorPaginaChecklistsAbertos = event.pageSize
    this.buscarCheckListsDeAmbienteAbertos();
  }

  atualizarPaginacaoChecklistsLiberados(event: PageEvent): void {
    this.paginaAtualChecklistsLiberados = event.pageIndex;
    this.itensPorPaginaChecklistsLiberados = event.pageSize
    this.buscarCheckListsDeAmbienteLiberados();
  }

  atualizarPaginacaoChecklistsEncerrados(event: PageEvent): void {
    this.paginaAtualChecklistsEncerrados = event.pageIndex;
    this.itensPorPaginaChecklistsEncerrados = event.pageSize
    this.buscarCheckListsDeAmbienteEncerrados();
  }

}

