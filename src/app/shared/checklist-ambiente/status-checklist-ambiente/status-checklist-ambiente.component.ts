import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-checklist-ambiente',
  imports: [
    CommonModule
  ],
  templateUrl: './status-checklist-ambiente.component.html',
  styleUrl: './status-checklist-ambiente.component.css'
})
export class StatusChecklistAmbienteComponent {

  @Input() status!: string;
}
