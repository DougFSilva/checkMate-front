import { Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { ChecklistAmbienteResumo } from '../../../core/types/CheckListAmbienteResponse';
import { CartaoComponent } from "../../cartao/cartao.component";
import { CartaoChecklistAmbienteDetalhadoComponent } from '../cartao-checklist-ambiente-detalhado/cartao-checklist-ambiente-detalhado.component';
import { StatusChecklistAmbienteComponent } from '../status-checklist-ambiente/status-checklist-ambiente.component';

@Component({
  selector: 'app-cartao-checklist-ambiente',
  imports: [
    CartaoComponent,
    CommonModule,
    StatusChecklistAmbienteComponent
],
  templateUrl: './cartao-checklist-ambiente.component.html',
  styleUrl: './cartao-checklist-ambiente.component.css'
})
export class CartaoChecklistAmbienteComponent {

  private dialog = inject(MatDialog);
  @Input() checklist!: ChecklistAmbienteResumo;
  @Output() checklistDeletado = new EventEmitter<void>();
  @Output() checklistLiberado = new EventEmitter<void>();
  @Output() checklistEncerrado = new EventEmitter<void>();

  abrirDialogChecklistAmbienteDetalhado(): void {
    const dialog = this.dialog.open(CartaoChecklistAmbienteDetalhadoComponent,
      {data: {id: this.checklist.id}}
    );
    dialog.afterClosed().subscribe(
      {
        next: (resposta) => {
          switch (resposta) {
            case 'deletado':
              this.checklistDeletado.emit();
              break;
            case 'liberado':
              this.checklistLiberado.emit();
              break;
            case 'encerrado':
              this.checklistEncerrado.emit();
              break;
          }
        }
      }
    )
  }
}
