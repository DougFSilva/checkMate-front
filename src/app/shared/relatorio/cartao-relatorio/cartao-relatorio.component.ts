import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { CartaoComponent } from "../../cartao/cartao.component";

@Component({
  selector: 'app-cartao-relatorio',
  imports: [CommonModule, CartaoComponent, MatIconModule],
  templateUrl: './cartao-relatorio.component.html',
  styleUrl: './cartao-relatorio.component.css'
})
export class CartaoRelatorioComponent {

  @Input() texto!: string;
  @Input() valor!: number;
  @Input() backgroundColor: string = '#007bff';
  @Input() color: string ='#ffffff';
}
