import { Component, Input } from '@angular/core';
import { ItemChecklistResumo } from '../../../../core/types/ItemChecklistResponse';
import { CartaoItemChecklistDetalhadoComponent } from "../../../../shared/item-checklist/cartao-item-checklist-detalhado/cartao-item-checklist-detalhado.component";

@Component({
  selector: 'app-grid-itemchecklist',
  imports: [CartaoItemChecklistDetalhadoComponent],
  templateUrl: './grid-itemchecklist.component.html',
  styleUrl: './grid-itemchecklist.component.css'
})
export class GridItemchecklistComponent {

  @Input() itensChecklist: ItemChecklistResumo[] = [];
}
