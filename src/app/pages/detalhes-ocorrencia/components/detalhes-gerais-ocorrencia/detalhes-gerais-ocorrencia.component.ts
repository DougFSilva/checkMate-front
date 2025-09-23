import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OcorrenciaDetalhado } from '../../../../core/types/OcorrenciaResponse';
import { StatusOcorrenciaComponent } from "../../../../shared/ocorrencias/status-ocorrencia/status-ocorrencia.component";

@Component({
  selector: 'app-detalhes-gerais-ocorrencia',
  imports: [RouterModule, StatusOcorrenciaComponent],
  templateUrl: './detalhes-gerais-ocorrencia.component.html',
  styleUrl: './detalhes-gerais-ocorrencia.component.css'
})
export class DetalhesGeraisOcorrenciaComponent {

  @Input() ocorrencia: Partial<OcorrenciaDetalhado> = {};
}
