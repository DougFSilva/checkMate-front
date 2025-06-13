import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-checklist-compartimento',
  imports: [
    CommonModule,
  ],
  templateUrl: './status-checklist-compartimento.component.html',
  styleUrl: './status-checklist-compartimento.component.css'
})
export class StatusChecklistCompartimentoComponent {

  @Input() status!: string;
}
