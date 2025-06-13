import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

import { AmbienteResumo } from '../../../core/types/AmbienteResponse';
import { API_CONFIG } from '../../../config/API_CONFIG';
import { MenuOperacoesAmbienteComponent } from '../menu-operacoes-ambiente/menu-operacoes-ambiente.component';
import { CartaoComponent } from '../../cartao/cartao.component';

@Component({
  selector: 'app-cartao-ambiente',
  imports: [
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    RouterModule,
    MenuOperacoesAmbienteComponent,
    CartaoComponent
  ],
  templateUrl: './cartao-ambiente.component.html',
  styleUrl: './cartao-ambiente.component.css'
})
export class CartaoAmbienteComponent {

  @Input() ambiente!: AmbienteResumo;
  @Output() ambienteModificado = new EventEmitter<void>();
  @Output() ambienteDeletado = new EventEmitter<void>();
  baseUrl: string = API_CONFIG.baseUrl + '/imagens/';

}
