import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CheckListAmbienteResumo } from '../../../../core/types/CheckListAmbienteResponse';
import { CartaoChecklistAmbienteComponent } from "../../../../shared/checklist-ambiente/cartao-checklist-ambiente/cartao-checklist-ambiente.component";
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-grid-checklists-ambiente',
  imports: [
    CartaoChecklistAmbienteComponent,
    MatPaginatorModule
  ],
  templateUrl: './grid-checklists-ambiente.component.html',
  styleUrl: './grid-checklists-ambiente.component.css'
})
export class GridChecklistsAmbienteComponent {

  @Input() checklists!: CheckListAmbienteResumo[];
  @Input() totalElementos!: number;
  @Input() opcaoItensPorPagina: number[] = [5, 10, 20];
  @Output() atualizarPaginacao = new EventEmitter<PageEvent>();
  @Output() checklistDeletado = new EventEmitter<void>();
  @Output() checklistLiberado = new EventEmitter<void>();
  @Output() checklistEncerrado = new EventEmitter<void>();
}
