import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

import { OcorrenciaDetalhado } from '../../core/types/OcorrenciaResponse';
import { OcorrenciaService } from '../../core/services/ocorrencia.service';
import { ContainerPrincipalComponent } from "../../shared/container-principal/container-principal.component";
import { CabecalhoDetalhesOcorrenciaComponent } from "./components/cabecalho-detalhes-ocorrencia/cabecalho-detalhes-ocorrencia.component";
import { DetalhesGeraisOcorrenciaComponent } from "./components/detalhes-gerais-ocorrencia/detalhes-gerais-ocorrencia.component";
import { DetalhesItemOcorrenciaComponent } from "./components/detalhes-item-ocorrencia/detalhes-item-ocorrencia.component";
import { TratamentosOcorrenciaComponent } from "./components/tratamentos-ocorrencia/tratamentos-ocorrencia.component";
import { BotaoAcaoComponent } from "../../shared/botao-acao/botao-acao.component";
import { ConfirmacaoComponent } from '../../shared/dialog/confirmacao/confirmacao.component';
import { CriarTratamentoOcorrenciaComponent } from '../../shared/ocorrencias/criar-tratamento-ocorrencia/criar-tratamento-ocorrencia.component';

@Component({
  selector: 'app-detalhes-ocorrencia',
  imports: [
    ContainerPrincipalComponent,
    CabecalhoDetalhesOcorrenciaComponent,
    DetalhesGeraisOcorrenciaComponent,
    DetalhesItemOcorrenciaComponent,
    TratamentosOcorrenciaComponent,
    BotaoAcaoComponent
],
  templateUrl: './detalhes-ocorrencia.component.html',
  styleUrl: './detalhes-ocorrencia.component.css'
})
export class DetalhesOcorrenciaComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  private toast = inject(ToastrService);
  private service = inject(OcorrenciaService);
  ocorrencia: OcorrenciaDetalhado = {
    id: 0,
    dataHora: new Date(),
    emissor: '',
    itemCheckList: {
      id: 0,
      checkListCompartimento: {
        id: 0,
        compartimento: {
          id: 0,
          codigo: '',
          nome: '',
          descricao: '',
          imagem: ''
        },
        checkListAmbiente: {
          id: 0,
          ambiente: {
            id: 0,
            descricao: '',
            imagem: '',
            localizacao: '',
            nome:''
          },
          dataHoraAbertura: new Date(),
          dataHoraEncerramento: new Date(),
          dataHoraLiberacao: new Date(),
          status: ''
        },
        dataHoraPreenchimentoEntrada: new Date(),
        dataHoraPreenchimentoSaida: new Date(),
        executorPreenchimentoEntrada: '',
        executorPreenchimentoSaida: '',
        status: ''
      },
      item: {
        id: 0,
        descricao: '',
        quantidade: 0,
        verificavel: false,
        imagem: ''
      },
      statusEntrada: '',
      statusSaida: '',
      observacaoEntrada: '',
      observacaoSaida: '',
    },
    responsavelEncerramento: {
      ID: 0,
      nome: '',
      email: '',
      perfil: ''
    },
    tratamento: [],
    encerrada: false
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.ocorrencia.id = Number(id);
        this.buscarOcorrencia();
        return;
      }
      this.toast.error('ID da ocorrência não encontrado na rota.');
    });
  }

  buscarOcorrencia(): void {
    this.service.buscaOcorrenciaPeloId(this.ocorrencia.id).subscribe(
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
    this.service.encerrarOCorrencia(this.ocorrencia.id).subscribe({
      next: () => {
        this.toast.success('Ocorrência encerrada com sucesso', 'SUCESSO');
        this.buscarOcorrencia();
        this.service.notificarAtualizacaoStatusOcorrencias();
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
