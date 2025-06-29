import { Component, Input} from '@angular/core';

import { TratamentoOcorrencia } from '../../../../core/types/OcorrenciaResponse';
import { CartaoTratamentoOcorrenciaComponent } from "../../../../shared/ocorrencias/cartao-tratamento-ocorrencia/cartao-tratamento-ocorrencia.component";

@Component({
  selector: 'app-tratamentos-ocorrencia',
  imports: [CartaoTratamentoOcorrenciaComponent],
  templateUrl: './tratamentos-ocorrencia.component.html',
  styleUrl: './tratamentos-ocorrencia.component.css'
})
export class TratamentosOcorrenciaComponent {

  @Input() tratamentos!: TratamentoOcorrencia[];
}
