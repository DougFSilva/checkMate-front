import { Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { ChecklistAmbienteResumo } from '../../../core/types/CheckListAmbienteResponse';
import { CartaoComponent } from "../../cartao/cartao.component";
import { StatusChecklistAmbienteComponent } from '../status-checklist-ambiente/status-checklist-ambiente.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cartao-checklist-ambiente',
  imports: [
    CartaoComponent,
    CommonModule,
    StatusChecklistAmbienteComponent,
    RouterModule
],
  templateUrl: './cartao-checklist-ambiente.component.html',
  styleUrl: './cartao-checklist-ambiente.component.css'
})
export class CartaoChecklistAmbienteComponent {

  @Input() checklist!: ChecklistAmbienteResumo;
  @Output() checklistDeletado = new EventEmitter<void>();
  @Output() checklistLiberado = new EventEmitter<void>();
  @Output() checklistEncerrado = new EventEmitter<void>();

}
