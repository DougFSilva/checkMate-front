import { Component, Input } from '@angular/core';
import { Ambiente } from '../../core/types/AmbienteResponse';
import { API_CONFIG } from '../../config/API_CONFIG';

@Component({
  selector: 'app-cartao-ambiente',
  imports: [],
  templateUrl: './cartao-ambiente.component.html',
  styleUrl: './cartao-ambiente.component.css'
})
export class CartaoAmbienteComponent {

  @Input() ambiente!: Ambiente;
  baseUrl: string = API_CONFIG.baseUrl;
}
