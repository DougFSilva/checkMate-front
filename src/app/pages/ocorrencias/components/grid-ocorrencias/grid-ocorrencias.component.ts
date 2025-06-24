import { Component, Input } from '@angular/core';

import { OcorrenciaResumo } from '../../../../core/types/OcorrenciaResponse';
import { CartaoOcorrenciaComponent } from "../../../../shared/ocorrencias/cartao-ocorrencia/cartao-ocorrencia.component";

@Component({
  selector: 'app-grid-ocorrencias',
  imports: [CartaoOcorrenciaComponent],
  templateUrl: './grid-ocorrencias.component.html',
  styleUrl: './grid-ocorrencias.component.css'
})
export class GridOcorrenciasComponent {

  @Input() ocorrencias!: OcorrenciaResumo[]
}
