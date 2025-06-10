import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CartaoDetalhesCompartimentoComponent } from '../cartao-detalhes-compartimento/cartao-detalhes-compartimento.component';
import { Router } from '@angular/router';

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

  private router = inject(Router);
  @Input() compartimento!: CompartimentoDetalhado;
  @Output() compartimentoModificado = new EventEmitter<void>();

  navegarParaTelaAmbientes(): void {
    this.router.navigate(['ambientes'])
  }
}
