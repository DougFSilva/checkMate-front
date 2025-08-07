import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ContainerPrincipalComponent } from "../../shared/container-principal/container-principal.component";
import { CheckListAmbienteDetalhado } from '../../core/types/CheckListAmbienteResponse';
import { ChecklistAmbienteService } from '../../core/services/checklist-ambiente.service';
import { CabecalhoChecklistsCompartimentoComponent } from './components/cabecalho-checklists-compartimento/cabecalho-checklists-compartimento.component';
import { GridChecklistsCompartimentoComponent } from "./components/grid-checklists-compartimento/grid-checklists-compartimento.component";
import { ChecklistCompartimentoResumo } from '../../core/types/ChecklistCompartimentoResponse';
import { ChecklistCompartimentoService } from '../../core/services/checklist-compartimento.service';
import { GridOcorrenciasComponent } from "../ocorrencias/components/grid-ocorrencias/grid-ocorrencias.component";
import { OcorrenciaService } from '../../core/services/ocorrencia.service';
import { OcorrenciaResumo } from '../../core/types/OcorrenciaResponse';
import { WebsocketService } from '../../core/services/websocket.service';

@Component({
  selector: 'app-checklists-compartimento',
  imports: [
    ContainerPrincipalComponent,
    CabecalhoChecklistsCompartimentoComponent,
    GridChecklistsCompartimentoComponent,
    GridOcorrenciasComponent,
    MatIconModule
  ],
  templateUrl: './checklists-compartimento.component.html',
  styleUrl: './checklists-compartimento.component.css'
})
export class ChecklistsCompartimentoComponent implements OnInit, OnDestroy {


  private checklistAmbienteService = inject(ChecklistAmbienteService);
  private checklistCompartimentoService = inject(ChecklistCompartimentoService);
  private ocorrenciaService = inject(OcorrenciaService);
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private toast = inject(ToastrService);
  private websocketService = inject(WebsocketService);
  private subscription = new Subscription();

  checklistAmbiente: CheckListAmbienteDetalhado = {
    id: 0,
    ambiente: {
      id: 0,
      nome: '',
      descricao: '',
      localizacao: '',
      imagem: ''
    },
    dataHoraAbertura: new Date(),
    dataHoraLiberacao: new Date(),
    dataHoraEncerramento: new Date(),
    responsavelAbertura: {
      id: 0,
      email: '',
      nome: '',
      perfil: '',
    },
    responsavelLiberacao: {
      id: 0,
      email: '',
      nome: '',
      perfil: '',
    },
    responsavelEncerramento: {
      id: 0,
      email: '',
      nome: '',
      perfil: '',
    },
    status: ''
  }
  checklistsCompartimento: ChecklistCompartimentoResumo[] = [];
  ocorrencias: OcorrenciaResumo[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.checklistAmbiente.id = Number(id);
        this.buscarChecklistAmbientePeloId();
        this.buscarChecklistsCompartimento();
        this.buscarOcorrencias();
        this.inscreverWs();
        return;
      }
      this.toast.error('ID do checklist de ambiente não encontrado na rota.');
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  inscreverWs(): void {
    this.subscription.add(this.websocketService.checklistAmbiente$.subscribe({
      next: (resposta) => {
        if (resposta.body === 'CHECKLIST_AMBIENTE_LIBERADO') {
          this.buscarChecklistAmbientePeloId();
        }
        else if (resposta.body === 'CHECKLIST_AMBIENTE_ENCERRADO') {
          this.buscarChecklistAmbientePeloId();
        }
      },
      error: (err) => {
        this.toast.error('Erro de inscrição no tópico checklists de ambiente. Tente recarregar a página.', 'ERRO');
        console.error('WebSocket Error:', err);
      }
    }));
    this.subscription.add(this.websocketService.checklistCompartimento$.subscribe({
      next: (resposta) => {
        if (resposta.body === 'CHECKLIST_COMPARTIMENTO_ENTRADA_PREENCHIDO'
          || resposta.body === 'CHECKLIST_COMPARTIMENTO_SAIDA_PREENCHIDO'
        ) {
          this.buscarChecklistsCompartimento();
        }
      },
      error: (err) => {
        this.toast.error('Erro de inscrição no tópico checklists de compartimento. Tente recarregar a página.', 'ERRO');
        console.error('WebSocket Error:', err);
      }
    }));
    this.subscription.add(this.websocketService.ocorrencia$.subscribe({
      next: (resposta) => {
        console.log(resposta)
        if (resposta.body === 'OCORRENCIA_ABERTA'
          || resposta.body === 'OCORRENCIA_ENCERRADA'
        ) {
          this.buscarOcorrencias();
        }
      },
      error: (err) => {
        this.toast.error('Erro de inscrição no tópico ocorrências. Tente recarregar a página.', 'ERRO');
        console.error('WebSocket Error:', err);
      }
    }));
  }

  buscarChecklistAmbientePeloId(): void {
    this.checklistAmbienteService.buscarChecklistDeAmbientePeloId(this.checklistAmbiente.id).subscribe(
      {
        next: (resposta) => {
          this.checklistAmbiente = resposta;
        },
        error: (err) => {
          this.toast.error(`Erro ao buscar checklist: ${err.error.mensagens}`, 'ERRO');
        }
      }
    )
  }

  buscarChecklistsCompartimento(): void {
    this.checklistCompartimentoService
      .buscarCheckListCompartimentoPeloCheckListAmbiente(this.checklistAmbiente.id)
      .subscribe(
        {
          next: (resposta) => {
            this.checklistsCompartimento = resposta;
          },
          error: (err) => {
            this.toast.error(`Erro ao buscar checklists de compartimento: ${err.error.mensagens}`, 'ERROR');
          }
        }
      )
  }

  buscarOcorrencias(): void {
    this.ocorrenciaService.buscarPeloChecklistAmbiente(this.checklistAmbiente.id).subscribe({
      next: (resposta) => {
        this.ocorrencias = resposta;
      },
      error: (err) => {
        this.toast.error(`Erro ao buscar ocorrências: ${err.error.mensagens}`, 'ERRO');
      }
    })
  }

  navegarParaPaginaAnterior(): void {
    this.location.back();
  }
}
