import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CartaoDetalhesCompartimentoComponent } from '../cartao-detalhes-compartimento/cartao-detalhes-compartimento.component';
import { Location } from '@angular/common';

import { CompartimentoDetalhado } from '../../../../core/types/CompartimentoResponse';
import { CartaoMetricaComponent } from '../../../../shared/cartao-metrica/cartao-metrica.component';

@Component({
  selector: 'app-cabecalho-detalhes-compartimento',
  imports: [
    CartaoDetalhesCompartimentoComponent,
    CartaoMetricaComponent
  ],
  templateUrl: './cabecalho-detalhes-compartimento.component.html',
  styleUrl: './cabecalho-detalhes-compartimento.component.css'
})
export class CabecalhoDetalhesCompartimentoComponent {

  private location = inject(Location);
  @Input() compartimento: Partial<CompartimentoDetalhado> = {};
  @Output() compartimentoModificado = new EventEmitter<void>();

  navegarParaPaginaAnterior(): void {
    this.location.back();
  }
}
