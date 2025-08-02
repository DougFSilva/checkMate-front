import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-info-itemcheklist',
  imports: [CommonModule, MatIconModule],
  templateUrl: './info-itemcheklist.component.html',
  styleUrl: './info-itemcheklist.component.css'
})
export class InfoItemcheklistComponent {

  @Input() titulo: string = 'Entrada';
  @Input() dataHora!: Date;
  @Input() status!: string;
  @Input() observacao!: string;
}
