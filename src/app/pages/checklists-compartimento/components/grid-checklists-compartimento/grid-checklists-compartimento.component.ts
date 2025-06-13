import { Component, Input } from '@angular/core';
import { ChecklistCompartimentoResumo } from '../../../../core/types/ChecklistCompartimentoResponse';
import { CartaoChecklistCompartimentoComponent } from "../../../../shared/checklist-compartimento/cartao-checklist-compartimento/cartao-checklist-compartimento.component";

@Component({
  selector: 'app-grid-checklists-compartimento',
  imports: [CartaoChecklistCompartimentoComponent],
  templateUrl: './grid-checklists-compartimento.component.html',
  styleUrl: './grid-checklists-compartimento.component.css'
})
export class GridChecklistsCompartimentoComponent {

  @Input() checklists!: ChecklistCompartimentoResumo[];
}
