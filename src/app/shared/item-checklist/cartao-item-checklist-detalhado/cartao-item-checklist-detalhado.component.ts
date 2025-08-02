import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

import { ItemChecklistResumo } from '../../../core/types/ItemChecklistResponse';
import { CartaoComponent } from "../../cartao/cartao.component";
import { InfoItemcheklistComponent } from "./components/info-itemcheklist/info-itemcheklist.component";

@Component({
  selector: 'app-cartao-item-checklist-detalhado',
  imports: [
    CartaoComponent,
    MatIconModule,
    CommonModule,
    InfoItemcheklistComponent
],
  templateUrl: './cartao-item-checklist-detalhado.component.html',
  styleUrl: './cartao-item-checklist-detalhado.component.css'
})
export class CartaoItemChecklistDetalhadoComponent {

  @Input() itemChecklist!: ItemChecklistResumo;
}
