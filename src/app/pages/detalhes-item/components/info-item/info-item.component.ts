import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ItemDetalhado } from '../../../../core/types/ItemResponse';
import { API_CONFIG } from '../../../../config/API_CONFIG';
import { MenuOperacoesItemComponent } from "../../../../shared/item/menu-operacoes-item/menu-operacoes-item.component";
import { CartaoComponent } from "../../../../shared/cartao/cartao.component";
import { MatDialog } from '@angular/material/dialog';
import { ExpoeImagemComponent } from '../../../../shared/expoe-imagem/expoe-imagem.component';


@Component({
  selector: 'app-info-item',
  imports: [MatIconModule, MenuOperacoesItemComponent, CartaoComponent],
  templateUrl: './info-item.component.html',
  styleUrl: './info-item.component.css'
})
export class InfoItemComponent {

  @Input() item: Partial<ItemDetalhado> = {};
  @Output() itemDeletado = new EventEmitter<void>();
  @Output() itemModificado = new EventEmitter<void>();
  private dialog = inject(MatDialog);
  baseUrl = API_CONFIG.baseUrl + '/imagens/';

  abrirImagem(src: string, alt: string): void {
    this.dialog.open(ExpoeImagemComponent, { data: { 'src': src, 'alt': alt } })
  }
}
