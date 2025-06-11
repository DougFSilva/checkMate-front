import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-botao-acao',
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './botao-acao.component.html',
  styleUrl: './botao-acao.component.css'
})
export class BotaoAcaoComponent {
  @Output() botaoAcionado = new EventEmitter<void>()
  @Input() matIcon: string = 'code';
}
