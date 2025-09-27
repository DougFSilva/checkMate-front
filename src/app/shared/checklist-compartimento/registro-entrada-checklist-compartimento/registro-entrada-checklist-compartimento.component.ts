import { Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { UsuarioResponse } from '../../../core/types/UsuarioResponse';
import { CartaoDadosUsuarioComponent } from '../../usuario/cartao-dados-usuario/cartao-dados-usuario.component';

@Component({
  selector: 'app-registro-entrada-checklist-compartimento',
  imports: [
    MatIconModule
  ],
  templateUrl: './registro-entrada-checklist-compartimento.component.html',
  styleUrl: './registro-entrada-checklist-compartimento.component.css'
})
export class RegistroEntradaChecklistCompartimentoComponent {
  
  @Input() dataHoraPreenchimento!: Date;
  @Input() executor!: UsuarioResponse;

  private dialog = inject(MatDialog);

  abrirDadosDoUsuario(): void {
    this.dialog.open(CartaoDadosUsuarioComponent, {data: {id: this.executor.id}});
  }
}
