import { Component, inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { OcorrenciaDetalhado } from '../../../../core/types/OcorrenciaResponse';
import { StatusOcorrenciaComponent } from "../../../../shared/ocorrencias/status-ocorrencia/status-ocorrencia.component";
import { CartaoDadosUsuarioComponent } from '../../../../shared/usuario/cartao-dados-usuario/cartao-dados-usuario.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-detalhes-gerais-ocorrencia',
  imports: [
    RouterModule, 
    StatusOcorrenciaComponent,
    DatePipe
  ],
  templateUrl: './detalhes-gerais-ocorrencia.component.html',
  styleUrl: './detalhes-gerais-ocorrencia.component.css'
})
export class DetalhesGeraisOcorrenciaComponent {

  @Input() ocorrencia: Partial<OcorrenciaDetalhado> = {};

  private dialog = inject(MatDialog);

  abrirDialogDetalhesDoUsuario(id: number): void {
    this.dialog.open(CartaoDadosUsuarioComponent, { data: { id: id } })
  }
}
