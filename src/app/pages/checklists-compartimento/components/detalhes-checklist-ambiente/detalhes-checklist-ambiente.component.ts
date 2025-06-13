import { Component, Input } from '@angular/core';
import { ChecklistAmbienteDetalhado } from '../../../../core/types/CheckListAmbienteResponse';
import { StatusChecklistAmbienteComponent } from '../../../../shared/checklist-ambiente/status-checklist-ambiente/status-checklist-ambiente.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-detalhes-checklist-ambiente',
  imports: [
    StatusChecklistAmbienteComponent,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './detalhes-checklist-ambiente.component.html',
  styleUrl: './detalhes-checklist-ambiente.component.css'
})
export class DetalhesChecklistAmbienteComponent {

  @Input() checklist!: ChecklistAmbienteDetalhado;
}
