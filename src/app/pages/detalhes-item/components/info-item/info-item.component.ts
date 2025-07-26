import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ItemDetalhado } from '../../../../core/types/ItemResponse';
import { API_CONFIG } from '../../../../config/API_CONFIG';


@Component({
  selector: 'app-info-item',
  imports: [MatIconModule],
  templateUrl: './info-item.component.html',
  styleUrl: './info-item.component.css'
})
export class InfoItemComponent {

  @Input() item!: ItemDetalhado;
  baseUrl = API_CONFIG.baseUrl + '/imagens/';
}
