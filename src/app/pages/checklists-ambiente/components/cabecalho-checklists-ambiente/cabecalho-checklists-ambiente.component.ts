import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AmbienteDetalhado } from '../../../../core/types/AmbienteResponse';
import { BotaoAcaoComponent } from '../../../../shared/botao-acao/botao-acao.component';

@Component({
  selector: 'app-cabecalho-checklists-ambiente',
  imports: [
    BotaoAcaoComponent
  ],
  templateUrl: './cabecalho-checklists-ambiente.component.html',
  styleUrl: './cabecalho-checklists-ambiente.component.css'
})
export class CabecalhoChecklistsAmbienteComponent {

  @Input() ambiente!: AmbienteDetalhado;
  @Output() abrirCheckList = new EventEmitter<void>();
}
