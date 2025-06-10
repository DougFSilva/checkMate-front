import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { CartaoComponent } from '../../cartao/cartao.component';
import { MenuOperacoesCompartimentoComponent } from '../menu-operacoes-compartimento/menu-operacoes-compartimento.component';
import { CompartimentoResumo } from '../../../core/types/CompartimentoResponse';
import { API_CONFIG } from '../../../config/API_CONFIG';

@Component({
  selector: 'app-cartao-compartimento',
  imports: [
    MatIconModule,
    CartaoComponent,
    MenuOperacoesCompartimentoComponent,
    RouterModule
  ],
  templateUrl: './cartao-compartimento.component.html',
  styleUrl: './cartao-compartimento.component.css'
})
export class CartaoCompartimentoComponent {

  @Input() compartimento!: CompartimentoResumo;
  @Output() compartimentoModificado = new EventEmitter<void>();
  @Output() compartimentoDeletado = new EventEmitter<void>();
  baseUrl: string = API_CONFIG.baseUrl;
}
