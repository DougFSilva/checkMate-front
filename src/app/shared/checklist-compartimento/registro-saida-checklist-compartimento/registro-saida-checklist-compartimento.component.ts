import { Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { UsuarioResponse } from '../../../core/types/UsuarioResponse';
import { CartaoDadosUsuarioComponent } from '../../usuario/cartao-dados-usuario/cartao-dados-usuario.component';

@Component({
  selector: 'app-registro-saida-checklist-compartimento',
  imports: [
    MatIconModule
  ],
  templateUrl: './registro-saida-checklist-compartimento.component.html',
  styleUrl: './registro-saida-checklist-compartimento.component.css'
})
export class RegistroSaidaChecklistCompartimentoComponent {
 
  @Input() dataHoraPreenchimento!: Date;
  @Input() executor!: UsuarioResponse;

  private dialog = inject(MatDialog);

  abrirDadosDoUsuario(): void {
    this.dialog.open(CartaoDadosUsuarioComponent, { data: { id: this.executor.id } });
  }
}
