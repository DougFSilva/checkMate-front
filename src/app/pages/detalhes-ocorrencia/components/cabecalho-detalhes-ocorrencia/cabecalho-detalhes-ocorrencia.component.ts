import { Component, Input } from '@angular/core';
import { StatusOcorrenciaComponent } from "../../../../shared/ocorrencias/status-ocorrencia/status-ocorrencia.component";

@Component({
  selector: 'app-cabecalho-detalhes-ocorrencia',
  imports: [StatusOcorrenciaComponent],
  templateUrl: './cabecalho-detalhes-ocorrencia.component.html',
  styleUrl: './cabecalho-detalhes-ocorrencia.component.css'
})
export class CabecalhoDetalhesOcorrenciaComponent {

  @Input() id!: number;
  @Input() status!: boolean
}
