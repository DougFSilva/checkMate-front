import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ChecklistCompartimentoResumo } from '../../../core/types/ChecklistCompartimentoResponse';
import { CartaoComponent } from '../../cartao/cartao.component';
import { API_CONFIG } from '../../../config/API_CONFIG';
import { StatusChecklistCompartimentoComponent } from "../status-checklist-compartimento/status-checklist-compartimento.component";
import { RegistroEntradaChecklistCompartimentoComponent } from "../registro-entrada-checklist-compartimento/registro-entrada-checklist-compartimento.component";
import { RegistroSaidaChecklistCompartimentoComponent } from "../registro-saida-checklist-compartimento/registro-saida-checklist-compartimento.component";
import { BotaoAcaoComponent } from "../../botao-acao/botao-acao.component";

@Component({
  selector: 'app-cartao-checklist-compartimento',
  imports: [
    CartaoComponent,
    StatusChecklistCompartimentoComponent,
    MatIconModule,
    RouterModule,
    RegistroEntradaChecklistCompartimentoComponent,
    RegistroSaidaChecklistCompartimentoComponent,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    BotaoAcaoComponent
],
  templateUrl: './cartao-checklist-compartimento.component.html',
  styleUrl: './cartao-checklist-compartimento.component.css'
})
export class CartaoChecklistCompartimentoComponent {

  @Input() checklist!: ChecklistCompartimentoResumo;
  @Input() statusChecklistAmbiente!: string;
  baseUrl = API_CONFIG.baseUrl + '/imagens/'
}
