import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { CartaoComponent } from '../cartao/cartao.component';


@Component({
  selector: 'app-cartao-metrica',
  imports: [
    MatIconModule,
    CartaoComponent,
    CommonModule
  ],
  templateUrl: './cartao-metrica.component.html',
  styleUrl: './cartao-metrica.component.css'
})
export class CartaoMetricaComponent {
  @Input() label!: string;
  @Input() matIcon!: string;
  @Input() quantidade!: number;
  @Input() cor: string = 'var(--cor-texto)';
}
