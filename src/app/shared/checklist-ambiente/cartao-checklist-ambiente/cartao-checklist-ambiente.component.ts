import { Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckListAmbienteResumo } from '../../../core/types/CheckListAmbienteResponse';
import { CartaoComponent } from "../../cartao/cartao.component";
import { StatusChecklistAmbienteComponent } from '../status-checklist-ambiente/status-checklist-ambiente.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cartao-checklist-ambiente',
  imports: [
    CartaoComponent,
    CommonModule,
    StatusChecklistAmbienteComponent,
    RouterModule,
    MatIconModule
],
  templateUrl: './cartao-checklist-ambiente.component.html',
  styleUrl: './cartao-checklist-ambiente.component.css'
})
export class CartaoChecklistAmbienteComponent {

  @Input() checklist!: CheckListAmbienteResumo;
  @Output() checklistDeletado = new EventEmitter<void>();
  @Output() checklistLiberado = new EventEmitter<void>();
  @Output() checklistEncerrado = new EventEmitter<void>();

}
