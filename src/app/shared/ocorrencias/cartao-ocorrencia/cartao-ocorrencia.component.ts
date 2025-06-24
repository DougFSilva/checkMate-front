import { Component, Input } from '@angular/core';

import { OcorrenciaResumo } from '../../../core/types/OcorrenciaResponse';
import { CartaoComponent } from "../../cartao/cartao.component";
import { StatusOcorrenciaComponent } from "../status-ocorrencia/status-ocorrencia.component";
import { BotaoAcaoComponent } from "../../botao-acao/botao-acao.component";

@Component({
  selector: 'app-cartao-ocorrencia',
  imports: [CartaoComponent, StatusOcorrenciaComponent, BotaoAcaoComponent],
  templateUrl: './cartao-ocorrencia.component.html',
  styleUrl: './cartao-ocorrencia.component.css'
})
export class CartaoOcorrenciaComponent {

  @Input() ocorrencia!: OcorrenciaResumo
}
