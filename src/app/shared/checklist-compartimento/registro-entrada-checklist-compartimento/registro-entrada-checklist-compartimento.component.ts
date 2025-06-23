import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-registro-entrada-checklist-compartimento',
  imports: [
    MatIconModule
  ],
  templateUrl: './registro-entrada-checklist-compartimento.component.html',
  styleUrl: './registro-entrada-checklist-compartimento.component.css'
})
export class RegistroEntradaChecklistCompartimentoComponent {
  @Input() dataHoraPreenchimento!: Date;
  @Input() executor!: string;
}
