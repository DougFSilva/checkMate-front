import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ChecklistCompartimentoDetalhado } from '../../../../core/types/ChecklistCompartimentoResponse';
import { StatusChecklistCompartimentoComponent } from "../../../../shared/checklist-compartimento/status-checklist-compartimento/status-checklist-compartimento.component";
import { RegistroEntradaChecklistCompartimentoComponent } from "../../../../shared/checklist-compartimento/registro-entrada-checklist-compartimento/registro-entrada-checklist-compartimento.component";
import { RegistroSaidaChecklistCompartimentoComponent } from "../../../../shared/checklist-compartimento/registro-saida-checklist-compartimento/registro-saida-checklist-compartimento.component";

@Component({
  selector: 'app-detalhes-checklist-compartimento',
  imports: [
    StatusChecklistCompartimentoComponent,
    MatIconModule,
    RegistroEntradaChecklistCompartimentoComponent,
    RegistroSaidaChecklistCompartimentoComponent
],
  templateUrl: './detalhes-checklist-compartimento.component.html',
  styleUrl: './detalhes-checklist-compartimento.component.css'
})
export class DetalhesChecklistCompartimentoComponent {

  @Input() checklist!: ChecklistCompartimentoDetalhado;
}
