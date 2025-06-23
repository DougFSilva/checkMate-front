import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-registro-saida-checklist-compartimento',
  imports: [
    MatIconModule
  ],
  templateUrl: './registro-saida-checklist-compartimento.component.html',
  styleUrl: './registro-saida-checklist-compartimento.component.css'
})
export class RegistroSaidaChecklistCompartimentoComponent {
  @Input() dataHoraPreenchimento!: Date;
  @Input() executor!: string;
}
