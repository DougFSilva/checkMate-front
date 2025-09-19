import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CartaoComponent } from "../../../../shared/cartao/cartao.component";

@Component({
  selector: 'app-cartao-link',
  imports: [
    CartaoComponent, 
    MatIconModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './cartao-link.component.html',
  styleUrl: './cartao-link.component.css'
})
export class CartaoLinkComponent {

  @Input() link!:string;
  @Input() icone!: string;
  @Input() titulo!: string;
  @Input() texto!: string;
  @Input() color!: string;
  @Input() backgroundColor!: string;
}
