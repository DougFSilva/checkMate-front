import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { ItemChecklistForm } from '../../../../core/types/ItemChecklistForm';
import { ItemChecklistResumo } from '../../../../core/types/ItemChecklistResponse';
import { BotaoAcaoComponent } from '../../../../shared/botao-acao/botao-acao.component';
import { CartaoItemChecklistSaidaComponent } from '../../../../shared/item-checklist/cartao-item-checklist-saida/cartao-item-checklist-saida.component';

@Component({
  selector: 'app-formulario-preench-checklist-saida',
  imports: [
    BotaoAcaoComponent,
    CartaoItemChecklistSaidaComponent,
  ],
  templateUrl: './formulario-preench-checklist-saida.component.html',
  styleUrl: './formulario-preench-checklist-saida.component.css'
})
export class FormularioPreenchChecklistSaidaComponent {
  @Input() itens!: ItemChecklistResumo[];
  @Input() statusChecklist!: string;
  @Output() enviarChecklistForm = new EventEmitter<ItemChecklistForm[]>();
  @ViewChildren(CartaoItemChecklistSaidaComponent)
  cartoesItens!: QueryList<CartaoItemChecklistSaidaComponent>;
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
