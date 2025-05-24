import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { Ambiente } from '../../../../core/types/AmbienteResponse';
import { API_CONFIG } from '../../../../config/API_CONFIG';
import { EditarAmbienteComponent } from '../../../editar-ambiente/editar-ambiente.component';

@Component({
  selector: 'app-cabecalho-detalhes-ambiente',
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './cabecalho-detalhes-ambiente.component.html',
  styleUrl: './cabecalho-detalhes-ambiente.component.css'
})
export class CabecalhoDetalhesAmbienteComponent {

  @Input() ambiente!: Ambiente;
  @Output() ambienteModificado = new EventEmitter<void>();
  private dialog = inject(MatDialog);
  baseUrl = API_CONFIG.baseUrl;

  abrirDialogEditarAmbiente(): void {
    const dialog = this.dialog.open(EditarAmbienteComponent, 
      {data: {ambiente: this.ambiente}});
    dialog.afterClosed().subscribe({
      next: (resposta) => {
        if (resposta) this.ambienteModificado.emit();
      }
    })
  }
}
