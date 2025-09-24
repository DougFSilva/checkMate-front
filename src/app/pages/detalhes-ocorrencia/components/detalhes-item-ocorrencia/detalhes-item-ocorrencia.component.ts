import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { API_CONFIG } from '../../../../config/API_CONFIG';
import { ItemChecklistDetalhado } from '../../../../core/types/ItemChecklistResponse';
import { CartaoComponent } from "../../../../shared/cartao/cartao.component";
import { ExpoeImagemComponent } from '../../../../shared/expoe-imagem/expoe-imagem.component';
import { InfoItemchecklistEntradaComponent } from "../../../../shared/ocorrencias/info-itemchecklist-entrada/info-itemchecklist-entrada.component";
import { InfoItemchecklistSaidaComponent } from "../../../../shared/ocorrencias/info-itemchecklist-saida/info-itemchecklist-saida.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-detalhes-item-ocorrencia',
  imports: [
    CartaoComponent, 
    InfoItemchecklistEntradaComponent, 
    InfoItemchecklistSaidaComponent,
    RouterModule
  ],
  templateUrl: './detalhes-item-ocorrencia.component.html',
  styleUrl: './detalhes-item-ocorrencia.component.css'
})
export class DetalhesItemOcorrenciaComponent {

  private dialog = inject(MatDialog);
  @Input() itemCheckList!: ItemChecklistDetalhado;
  baseUrl = API_CONFIG.baseUrl + '/imagens/'

  abrirImagem(src: string, alt: string): void {
    this.dialog.open(ExpoeImagemComponent, { data: { 'src': src, 'alt': alt } })
  }
}
