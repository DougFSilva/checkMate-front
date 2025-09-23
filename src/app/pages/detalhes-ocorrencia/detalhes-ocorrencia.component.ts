import { Component, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { WebsocketService } from '../../core/services/websocket.service';
import { Subscription } from 'rxjs';

import { OcorrenciaDetalhado } from '../../core/types/OcorrenciaResponse';
import { OcorrenciaService } from '../../core/services/ocorrencia.service';
import { ContainerPrincipalComponent } from "../../shared/container-principal/container-principal.component";
import { DetalhesGeraisOcorrenciaComponent } from "./components/detalhes-gerais-ocorrencia/detalhes-gerais-ocorrencia.component";
import { DetalhesItemOcorrenciaComponent } from "./components/detalhes-item-ocorrencia/detalhes-item-ocorrencia.component";
import { TratamentosOcorrenciaComponent } from "./components/tratamentos-ocorrencia/tratamentos-ocorrencia.component";
import { BotaoAcaoComponent } from "../../shared/botao-acao/botao-acao.component";
import { ConfirmacaoComponent } from '../../shared/dialog/confirmacao/confirmacao.component';
import { CriarTratamentoOcorrenciaComponent } from '../../shared/ocorrencias/criar-tratamento-ocorrencia/criar-tratamento-ocorrencia.component';
import { TituloComponent } from "../../shared/titulo/titulo.component";


@Component({
  selector: 'app-detalhes-ocorrencia',
  imports: [
    ContainerPrincipalComponent,
    DetalhesGeraisOcorrenciaComponent,
    DetalhesItemOcorrenciaComponent,
    TratamentosOcorrenciaComponent,
    BotaoAcaoComponent,
    TituloComponent
],
  templateUrl: './detalhes-ocorrencia.component.html',
  styleUrl: './detalhes-ocorrencia.component.css'
})
export class DetalhesOcorrenciaComponent implements OnInit, OnDestroy {

  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  private toast = inject(ToastrService);
  private service = inject(OcorrenciaService);
  private websocketService = inject(WebsocketService);
  private subscription = new Subscription();
  ocorrencia: Partial<OcorrenciaDetalhado> = {}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.ocorrencia.id = Number(id);
        this.buscarOcorrencia();
        this.inscreverWs();
        return;
      }
      this.toast.error('ID da ocorrência não encontrado na rota.');
    });
  }

  inscreverWs(): void {
    this.subscription.add(this.websocketService.ocorrencia$.subscribe({
      next: () => {
        this.buscarOcorrencia();
      },
       error: (err) => {
        this.toast.error('Erro de inscrição no tópico ocorrências. Tente recarregar a página.', 'ERRO');
        console.error('WebSocket Error:', err);
      }
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  buscarOcorrencia(): void {
    this.service.buscaOcorrenciaPeloId(this.ocorrencia.id!).subscribe(
      {
        next: (resposta) => {
          this.ocorrencia = resposta;
        },
        error: (err) => {
          this.toast.error(`Erro ao buscar ocorrência: ${err.error.mensagens}`)
        }
      }
    )
  }

  abrirDialogEncerrarOcorrencia(): void {
    const dialog = this.dialog.open(ConfirmacaoComponent, 
      {data: {'texto': 'Deseja realmente encerrar a ocorrência'}});
    dialog.afterClosed().subscribe({
      next: (resposta) => {
        if (resposta) this.encerrarOcorrencia();
      }
    })
  }

  encerrarOcorrencia(): void {
    this.service.encerrarOCorrencia(this.ocorrencia.id!).subscribe({
      next: () => {
        this.toast.success('Ocorrência encerrada com sucesso', 'SUCESSO');
      },
      error: (err) => {
        this.toast.error(`Erro ao encerrar a ocorrência: ${err.error.mensagens}`, 'ERRO');
      }
    })
  }

  abrirDialogCriarTratamento(): void {
    const dialog = this.dialog.open(CriarTratamentoOcorrenciaComponent, 
      {data: {'ocorrenciaId': this.ocorrencia.id}}
    );
    dialog.afterClosed().subscribe(
      {
        next: (resposta) => {
          if (resposta) this.buscarOcorrencia();
        }
      }
    )
  }
}
