import { Component, inject, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { OcorrenciaResumo } from '../../../core/types/OcorrenciaResponse';
import { CartaoComponent } from "../../cartao/cartao.component";
import { StatusOcorrenciaComponent } from "../status-ocorrencia/status-ocorrencia.component";
import { InfoItemchecklistEntradaComponent } from "../info-itemchecklist-entrada/info-itemchecklist-entrada.component";
import { InfoItemchecklistSaidaComponent } from "../info-itemchecklist-saida/info-itemchecklist-saida.component";
import { CartaoDadosUsuarioComponent } from '../../usuario/cartao-dados-usuario/cartao-dados-usuario.component';

@Component({
  selector: 'app-cartao-ocorrencia',
  imports: [
    CartaoComponent,
    StatusOcorrenciaComponent,
    CommonModule,
    RouterModule,
    MatIconModule,
    InfoItemchecklistEntradaComponent,
    InfoItemchecklistSaidaComponent,
    DatePipe
],
  templateUrl: './cartao-ocorrencia.component.html',
  styleUrl: './cartao-ocorrencia.component.css'
})
export class CartaoOcorrenciaComponent {

  @Input() ocorrencia!: OcorrenciaResumo
  private dialog = inject(MatDialog);

  abrirDialogDetalhesDoUsuario(id: number): void {
    this.dialog.open(CartaoDadosUsuarioComponent, {data: {id: id}})
  }
}
