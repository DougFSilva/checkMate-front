import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { AmbienteDetalhado } from '../../../../core/types/AmbienteResponse';
import { MenuOperacoesAmbienteComponent } from '../../../../shared/ambiente/menu-operacoes-ambiente/menu-operacoes-ambiente.component';
import { API_CONFIG } from '../../../../config/API_CONFIG';
import { CartaoComponent } from '../../../../shared/cartao/cartao.component';
import { MatDialog } from '@angular/material/dialog';
import { ExpoeImagemComponent } from '../../../../shared/expoe-imagem/expoe-imagem.component';
import { BotaoAcaoComponent } from "../../../../shared/botao-acao/botao-acao.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cartao-detalhes-ambiente',
  imports: [
    MenuOperacoesAmbienteComponent,
    MatIconModule,
    CartaoComponent,
    BotaoAcaoComponent,
    RouterModule
],
  templateUrl: './cartao-detalhes-ambiente.component.html',
  styleUrl: './cartao-detalhes-ambiente.component.css'
})
export class CartaoDetalhesAmbienteComponent {

  private dialog = inject(MatDialog);
  @Input() ambiente!: AmbienteDetalhado;
  @Output() ambienteModificado = new EventEmitter<void>();
  @Output() ambienteDeletado = new EventEmitter<void>();
  baseUrl = API_CONFIG.baseUrl + '/imagens/';

  abrirImagem(src: string, alt: string): void {
      this.dialog.open(ExpoeImagemComponent, {data: {'src': src, 'alt': alt}})
  }
}
