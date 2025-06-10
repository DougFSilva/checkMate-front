import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { AmbienteDetalhado } from '../../../../core/types/AmbienteResponse';
import { MenuOperacoesAmbienteComponent } from '../../../../shared/ambiente/menu-operacoes-ambiente/menu-operacoes-ambiente.component';
import { API_CONFIG } from '../../../../config/API_CONFIG';
import { CartaoComponent } from '../../../../shared/cartao/cartao.component';

@Component({
  selector: 'app-cartao-detalhes-ambiente',
  imports: [
    MenuOperacoesAmbienteComponent,
    MatIconModule, CartaoComponent
  ],
  templateUrl: './cartao-detalhes-ambiente.component.html',
  styleUrl: './cartao-detalhes-ambiente.component.css'
})
export class CartaoDetalhesAmbienteComponent {

  @Input() ambiente!: AmbienteDetalhado;
  @Output() ambienteModificado = new EventEmitter<void>();
  @Output() ambienteDeletado = new EventEmitter<void>();
  baseUrl = API_CONFIG.baseUrl;
}
