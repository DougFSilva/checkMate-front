import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

import { AmbienteService } from '../../../core/services/ambiente.service';
import { Ambiente } from '../../../core/types/AmbienteResponse';
import { API_CONFIG } from '../../../config/API_CONFIG';
import { ConfirmacaoComponent } from '../../dialog/confirmacao/confirmacao.component';
import { EditarAmbienteComponent } from '../editar-ambiente/editar-ambiente.component';
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

  @Input() ambiente!: Ambiente;
  @Output() ambienteModificado = new EventEmitter<void>();
  @Output() ambienteDeletado = new EventEmitter<void>();
  baseUrl: string = API_CONFIG.baseUrl;

}
