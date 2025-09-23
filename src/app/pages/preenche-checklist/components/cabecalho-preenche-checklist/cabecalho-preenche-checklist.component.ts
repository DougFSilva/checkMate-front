import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ChecklistCompartimentoDetalhado } from '../../../../core/types/ChecklistCompartimentoResponse';
import { BotaoAcaoComponent } from "../../../../shared/botao-acao/botao-acao.component";
import { DetalhesChecklistCompartimentoComponent } from "../detalhes-checklist-compartimento/detalhes-checklist-compartimento.component";

@Component({
  selector: 'app-cabecalho-preenche-checklist',
  imports: [
    MatIconModule,
    DetalhesChecklistCompartimentoComponent
],
  templateUrl: './cabecalho-preenche-checklist.component.html',
  styleUrl: './cabecalho-preenche-checklist.component.css'
})
export class CabecalhoPreencheChecklistComponent {
  @Input() checklist: Partial<ChecklistCompartimentoDetalhado> ={};
  @Output() enviarChecklist = new EventEmitter<void>();

}
