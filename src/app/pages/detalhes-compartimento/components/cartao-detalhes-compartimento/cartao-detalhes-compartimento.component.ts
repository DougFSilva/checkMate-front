import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { CompartimentoDetalhado } from '../../../../core/types/CompartimentoResponse';
import { API_CONFIG } from '../../../../config/API_CONFIG';
import { CartaoComponent } from '../../../../shared/cartao/cartao.component';
import { MenuOperacoesCompartimentoComponent } from "../../../../shared/compartimento/menu-operacoes-compartimento/menu-operacoes-compartimento.component";
import { MatDialog } from '@angular/material/dialog';
import { ExpoeImagemComponent } from '../../../../shared/expoe-imagem/expoe-imagem.component';

@Component({
  selector: 'app-cartao-detalhes-compartimento',
  imports: [
    MatIconModule,
    CartaoComponent,
    MenuOperacoesCompartimentoComponent
],
  templateUrl: './cartao-detalhes-compartimento.component.html',
  styleUrl: './cartao-detalhes-compartimento.component.css'
})
export class CartaoDetalhesCompartimentoComponent {

  private dialog = inject(MatDialog);
  @Input() compartimento!: CompartimentoDetalhado;
  @Output() compartimentoModificado = new EventEmitter<void>();
  @Output() compartimentoDeletado = new EventEmitter<void>();
  baseUrl = API_CONFIG.baseUrl;

  abrirImagem(src: string, alt: string): void {
      this.dialog.open(ExpoeImagemComponent, {data: {'src': src, 'alt': alt}})
  }
}
