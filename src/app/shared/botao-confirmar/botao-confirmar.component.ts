import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-botao-confirmar',
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './botao-confirmar.component.html',
  styleUrl: './botao-confirmar.component.css'
})
export class BotaoConfirmarComponent {
  @Output() botaoAcionado = new EventEmitter<void>()
  @Input() matIcon: string = 'check';
}
