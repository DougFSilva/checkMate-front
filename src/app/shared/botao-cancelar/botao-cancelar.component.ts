import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-botao-cancelar',
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './botao-cancelar.component.html',
  styleUrl: './botao-cancelar.component.css'
})
export class BotaoCancelarComponent {
  @Output() botaoAcionado = new EventEmitter<void>()
  @Input() matIcon: string = 'close';

}
