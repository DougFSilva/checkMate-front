import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OcorrenciaDetalhado } from '../../../../core/types/OcorrenciaResponse';

@Component({
  selector: 'app-detalhes-gerais-ocorrencia',
  imports: [RouterModule],
  templateUrl: './detalhes-gerais-ocorrencia.component.html',
  styleUrl: './detalhes-gerais-ocorrencia.component.css'
})
export class DetalhesGeraisOcorrenciaComponent {

  @Input() ocorrencia!: OcorrenciaDetalhado;
}
