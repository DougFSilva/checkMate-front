import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ChecklistAmbienteDetalhado } from '../../../../core/types/CheckListAmbienteResponse';
import { MenuOperacoesChecklistAmbienteComponent } from "../../../../shared/checklist-ambiente/menu-operacoes-checklist-ambiente/menu-operacoes-checklist-ambiente.component";
import { DetalhesChecklistAmbienteComponent } from "../detalhes-checklist-ambiente/detalhes-checklist-ambiente.component";

@Component({
  selector: 'app-cabecalho-checklists-compartimento',
  imports: [
    MenuOperacoesChecklistAmbienteComponent,
    MatIconModule,
    DetalhesChecklistAmbienteComponent
],
  templateUrl: './cabecalho-checklists-compartimento.component.html',
  styleUrl: './cabecalho-checklists-compartimento.component.css'
})
export class CabecalhoChecklistsCompartimentoComponent {

  @Input() checklist!: ChecklistAmbienteDetalhado;
  @Output() checklistDeletado = new EventEmitter<void>();
  @Output() checklistLiberado = new EventEmitter<void>();
  @Output() checklistEncerrado = new EventEmitter<void>();
}
