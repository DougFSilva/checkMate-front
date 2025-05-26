import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

import { CartaoComponent } from '../../../../shared/cartao/cartao.component';

@Component({
  selector: 'app-cartao-metrica-ambiente',
  imports: [
    MatIconModule,
    CartaoComponent,
    CommonModule
  ],
  templateUrl: './cartao-metrica-ambiente.component.html',
  styleUrl: './cartao-metrica-ambiente.component.css'
})
export class CartaoMetricaAmbienteComponent {

  @Input() label!: string;
  @Input() matIcon!: string;
  @Input() quantidade!: number;
  @Input() cor: string = 'var(--cor-texto)';
}
