import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { BotaoAcaoComponent } from '../../../../shared/botao-acao/botao-acao.component';

import { ItemChecklistForm } from '../../../../core/types/ItemChecklistForm';
import { ItemChecklistResumo } from '../../../../core/types/ItemChecklistResponse';
import { CartaoItemChecklistEntradaComponent } from '../../../../shared/item-checklist/cartao-item-checklist-entrada/cartao-item-checklist-entrada.component';

@Component({
  selector: 'app-formulario-preench-checklist-entrada',
  imports: [
    BotaoAcaoComponent,
    CartaoItemChecklistEntradaComponent,
  ],
  templateUrl: './formulario-preench-checklist-entrada.component.html',
  styleUrl: './formulario-preench-checklist-entrada.component.css'
})
export class FormularioPreenchChecklistEntradaComponent {

  @Input() itens!: ItemChecklistResumo[];
  @Input() statusChecklist!: string;
  @Output() enviarChecklistForm = new EventEmitter<ItemChecklistForm[]>();
  @ViewChildren(CartaoItemChecklistEntradaComponent)
  cartoesItens!: QueryList<CartaoItemChecklistEntradaComponent>;
  itensChecklistForm: ItemChecklistForm[] = []

  coletarDadosChecklist(): void {
    this.itensChecklistForm = [];
    this.cartoesItens.forEach(cartao => {
      this.itensChecklistForm.push(cartao.getItemChecklistForm());
    });
  }

  enviarChecklist(): void {
    this.coletarDadosChecklist();
    this.enviarChecklistForm.emit(this.itensChecklistForm);
  }
}

