import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-botao-add',
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './botao-add.component.html',
  styleUrl: './botao-add.component.css'
})
export class BotaoAddComponent {
  @Output() botaoAcionado = new EventEmitter<void>();
}
