import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../../core/services/websocket.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';

import { ContainerPrincipalComponent } from '../../shared/container-principal/container-principal.component';
import { RelatorioService } from '../../core/services/relatorio.service';
import { RelatorioResumoGeral } from '../../core/types/RelatorioResumoGeral';
import { CartaoRelatorioComponent } from "../../shared/relatorio/cartao-relatorio/cartao-relatorio.component";
import { ChecklistAmbienteService } from '../../core/services/checklist-ambiente.service';
import { CheckListAmbienteResumo } from '../../core/types/CheckListAmbienteResponse';
import { GraficoChecklistAmbienteComponent } from "./components/grafico-checklist-ambiente/grafico-checklist-ambiente.component";
import { MatIconModule } from '@angular/material/icon';
import { CartaoLinkComponent } from "./components/cartao-link/cartao-link.component";
import { TituloComponent } from "../../shared/titulo/titulo.component";

@Component({
  selector: 'app-home',
  imports: [
    ContainerPrincipalComponent,
    CartaoRelatorioComponent,
    MatDatepickerModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    GraficoChecklistAmbienteComponent,
    MatIconModule,
    CartaoLinkComponent,
    TituloComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [provideNativeDateAdapter()]

})
export class HomeComponent implements OnInit, OnDestroy {

  private relatorioService = inject(RelatorioService);
  private websocketService = inject(WebsocketService);
  private toast = inject(ToastrService);
  private checklistAmbienteService = inject(ChecklistAmbienteService);
  private subscription = new Subscription();
  relatorioResumoGeral: Partial<RelatorioResumoGeral> = {};
  checklistAmbiente: CheckListAmbienteResumo[] = [];
  dataRange = new FormGroup({
    dataInicial: new FormControl<Date | null>(new Date(new Date().setFullYear(new Date().getFullYear() - 1))),
    dataFinal: new FormControl<Date | null>(new Date()),
  });

  ngOnInit(): void {
    this.buscarRelatorioResumoGeral();
    this.buscarChecklistsAmbiente();
    this.inscreveWs();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  inscreveWs(): void {
    this.subscription.add(this.websocketService.checklistAmbiente$.subscribe({
      next: (resposta) => {
        if (resposta.body === 'CHECKLIST_AMBIENTE_ABERTO'
          || resposta.body === 'CHECKLIST_AMBIENTE_DELETADO'
          || resposta.body === 'CHECKLIST_AMBIENTE_ENCERRADO'
        ) {
          this.buscarRelatorioResumoGeral();
          this.buscarChecklistsAmbiente();
        }
      },
      error: (err) => {
        this.toast.error('Erro de inscrição no tópico checklist de ambientes. Tente recarregar a página.', 'ERRO');
        console.error('WebSocket Error:', err);
      }
    }));
    this.subscription.add(this.websocketService.ocorrencia$.subscribe({
      next: (resposta) => {
        if (resposta.body === 'OCORRENCIA_ABERTA') {
          this.buscarRelatorioResumoGeral();
        }
      },
      error: (err) => {
        this.toast.error('Erro de inscrição no tópico ocorrências. Tente recarregar a página.', 'ERRO');
        console.error('WebSocket Error:', err);
      }
    }))
  }

  buscarRelatorioResumoGeral(): void {
    this.relatorioService.buscarRelatorioResumoGeral().subscribe({
      next: (resposta) => {
        this.relatorioResumoGeral = resposta;
      },
      error: (err) => {
        this.toast.error(`Erro ao buscar relatório resumo geral: ${err.error.mensagens}`, 'ERRO');
        console.error(err);
      }
    })
  }

  buscarChecklistsAmbiente(): void {
    const dataInicial = this.dataRange.get('dataInicial')!.value;
    const dataFinal = this.dataRange.get('dataFinal')!.value;
    if (dataInicial == null || dataFinal == null) {
      return;
    }
    this.checklistAmbienteService.buscarCheckListsDeAmbientePelaDataHoraAbertura(
      dataInicial, dataFinal, 0, 100000
    ).subscribe({
      next: (resposta) => {
        this.checklistAmbiente = [...resposta.content];
        console.log(this.checklistAmbiente)
      },
      error: (err) => {
        this.toast.error(`Erro ao buscar checklists de ambiente: ${err.error.mensagens}`, 'ERRO');
      }
    })
  }
}
