import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-ocorrencia',
  imports: [CommonModule],
  templateUrl: './status-ocorrencia.component.html',
  styleUrl: './status-ocorrencia.component.css'
})
export class StatusOcorrenciaComponent {

  @Input() status!: boolean
}
