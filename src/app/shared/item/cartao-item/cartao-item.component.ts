import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';

import { ItemResumo } from '../../../core/types/ItemResponse';
import { CartaoComponent } from '../../cartao/cartao.component';
import { MenuOperacoesItemComponent } from '../menu-operacoes-item/menu-operacoes-item.component';
import { API_CONFIG } from '../../../config/API_CONFIG';
import { ExpoeImagemComponent } from '../../expoe-imagem/expoe-imagem.component';

@Component({
  selector: 'app-cartao-item',
  imports: [
    CartaoComponent,
    MenuOperacoesItemComponent,
    MatIconModule,
    RouterModule,
    MatTooltipModule
  ],
  templateUrl: './cartao-item.component.html',
  styleUrl: './cartao-item.component.css'
})
export class CartaoItemComponent {

  private dialog = inject(MatDialog)
  @Input() item!: ItemResumo;
  @Output() itemModificado = new EventEmitter<void>();
  @Output() itemDeletado = new EventEmitter<void>();
  baseUrl: string = API_CONFIG.baseUrl;

  abrirImagem(src: string, alt: string): void {
    this.dialog.open(ExpoeImagemComponent, { data: { 'src': src, 'alt': alt } })
  }

  getDescricaoTruncada(descricao: string): string {
    const limite = 35
    if (window.innerWidth < 640 && descricao.length >= limite) {
      return descricao.slice(0, limite) + '...';
    }
    return descricao;
  }

}
