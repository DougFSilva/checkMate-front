import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartaoItemComponent } from '../../../../shared/item/cartao-item/cartao-item.component';
import { ItemResumo } from '../../../../core/types/ItemResponse';

@Component({
  selector: 'app-grid-itens-compartimento',
  imports: [
    CartaoItemComponent
  ],
  templateUrl: './grid-itens-compartimento.component.html',
  styleUrl: './grid-itens-compartimento.component.css'
})
export class GridItensCompartimentoComponent {

  @Input() itens!: ItemResumo[];
  @Output() itemModificado = new EventEmitter<void>();
  @Output() itemDeletado = new EventEmitter<void>();
}
