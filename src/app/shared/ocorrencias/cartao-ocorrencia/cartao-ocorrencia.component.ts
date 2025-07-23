import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { OcorrenciaResumo } from '../../../core/types/OcorrenciaResponse';
import { CartaoComponent } from "../../cartao/cartao.component";
import { StatusOcorrenciaComponent } from "../status-ocorrencia/status-ocorrencia.component";
import { InfoItemchecklistEntradaComponent } from "../info-itemchecklist-entrada/info-itemchecklist-entrada.component";
import { InfoItemchecklistSaidaComponent } from "../info-itemchecklist-saida/info-itemchecklist-saida.component";

@Component({
  selector: 'app-cartao-ocorrencia',
  imports: [
    CartaoComponent,
    StatusOcorrenciaComponent,
    CommonModule,
    RouterModule,
    MatIconModule,
    InfoItemchecklistEntradaComponent,
    InfoItemchecklistSaidaComponent,
],
  templateUrl: './cartao-ocorrencia.component.html',
  styleUrl: './cartao-ocorrencia.component.css'
})
export class CartaoOcorrenciaComponent {

  @Input() ocorrencia!: OcorrenciaResumo
}
