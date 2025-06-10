import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { CompartimentoResumo } from '../../../../core/types/CompartimentoResponse';
import { CartaoCompartimentoComponent } from "../../../../shared/compartimento/cartao-compartimento/cartao-compartimento.component";

@Component({
  selector: 'app-grid-compartimentos-ambiente',
  imports: [
    CartaoCompartimentoComponent,
  ],
  templateUrl: './grid-compartimentos-ambiente.component.html',
  styleUrl: './grid-compartimentos-ambiente.component.css'
})
export class GridCompartimentosAmbienteComponent {

  @Input() compartimentos!: CompartimentoResumo[]; 
  @Output() pageEvent = new EventEmitter<PageEvent>();
  @Output() compartimentoModificado = new EventEmitter<void>();
  @Output() compartimentoDeletado = new EventEmitter<void>();
}
