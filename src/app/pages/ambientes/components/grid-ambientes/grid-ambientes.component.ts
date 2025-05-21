import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Ambiente } from '../../../../core/types/AmbienteResponse';
import { CartaoAmbienteComponent } from '../../../../shared/cartao-ambiente/cartao-ambiente.component';

@Component({
  selector: 'app-grid-ambientes',
  imports: [
    CartaoAmbienteComponent
  ],
  templateUrl: './grid-ambientes.component.html',
  styleUrl: './grid-ambientes.component.css'
})
export class GridAmbientesComponent {

  @Input() ambientes!: Ambiente[];
  @Output() ambienteModificado = new EventEmitter<void>();
}
