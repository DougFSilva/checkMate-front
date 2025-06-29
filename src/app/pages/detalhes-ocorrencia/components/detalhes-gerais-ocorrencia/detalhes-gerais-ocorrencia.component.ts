import { Component, Input } from '@angular/core';
import { OcorrenciaDetalhado } from '../../../../core/types/OcorrenciaResponse';

@Component({
  selector: 'app-detalhes-gerais-ocorrencia',
  imports: [],
  templateUrl: './detalhes-gerais-ocorrencia.component.html',
  styleUrl: './detalhes-gerais-ocorrencia.component.css'
})
export class DetalhesGeraisOcorrenciaComponent {

  @Input() ocorrencia!: OcorrenciaDetalhado;
}
