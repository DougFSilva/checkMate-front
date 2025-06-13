import { Component, inject, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { ChecklistAmbienteResumo } from '../../../core/types/CheckListAmbienteResponse';
import { CartaoComponent } from "../../cartao/cartao.component";
import { CartaoChecklistAmbienteDetalhadoComponent } from '../cartao-checklist-ambiente-detalhado/cartao-checklist-ambiente-detalhado.component';
import { ConfirmacaoComponent } from '../../dialog/confirmacao/confirmacao.component';

@Component({
  selector: 'app-cartao-checklist-ambiente',
  imports: [
    CartaoComponent,
    CommonModule,
],
  templateUrl: './cartao-checklist-ambiente.component.html',
  styleUrl: './cartao-checklist-ambiente.component.css'
})
export class CartaoChecklistAmbienteComponent {

  private dialog = inject(MatDialog);
  @Input() checklist!: ChecklistAmbienteResumo;

  abrirDialogChecklistAmbienteDetalhado(): void {
    const dialog = this.dialog.open(CartaoChecklistAmbienteDetalhadoComponent,
      {data: {id: this.checklist.id}}
    );
   
  }
}
