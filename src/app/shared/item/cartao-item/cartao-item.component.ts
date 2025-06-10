import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ItemResumo } from '../../../core/types/ItemResponse';
import { CartaoComponent } from '../../cartao/cartao.component';
import { MenuOperacoesItemComponent } from '../menu-operacoes-item/menu-operacoes-item.component';
import { API_CONFIG } from '../../../config/API_CONFIG';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-cartao-item',
  imports: [
    CartaoComponent,
    MenuOperacoesItemComponent,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './cartao-item.component.html',
  styleUrl: './cartao-item.component.css'
})
export class CartaoItemComponent {

  @Input() item!: ItemResumo;
  @Output() itemModificado = new EventEmitter<void>();
  @Output() itemDeletado = new EventEmitter<void>();
  baseUrl: string = API_CONFIG.baseUrl;
  
}
