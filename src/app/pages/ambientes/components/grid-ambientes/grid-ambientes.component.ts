import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AmbienteResumo } from '../../../../core/types/AmbienteResponse';
import { CartaoAmbienteComponent } from '../../../../shared/ambiente/cartao-ambiente/cartao-ambiente.component';

@Component({
  selector: 'app-grid-ambientes',
  imports: [
    CartaoAmbienteComponent
  ],
  templateUrl: './grid-ambientes.component.html',
  styleUrl: './grid-ambientes.component.css'
})
export class GridAmbientesComponent {

  @Input() ambientes!: AmbienteResumo[];
  @Output() ambienteModificado = new EventEmitter<void>();
  @Output() ambienteDeletado = new EventEmitter<void>();
}
