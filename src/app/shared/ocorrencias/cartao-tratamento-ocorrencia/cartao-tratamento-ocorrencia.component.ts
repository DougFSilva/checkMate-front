import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { TratamentoOcorrencia } from '../../../core/types/OcorrenciaResponse';
import { CartaoComponent } from "../../cartao/cartao.component";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cartao-tratamento-ocorrencia',
  imports: [
    CartaoComponent, 
    MatIconModule,
    DatePipe
  ],
  templateUrl: './cartao-tratamento-ocorrencia.component.html',
  styleUrl: './cartao-tratamento-ocorrencia.component.css'
})
export class CartaoTratamentoOcorrenciaComponent {

  @Input() tratamento!: TratamentoOcorrencia;
}
