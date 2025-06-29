import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-info-itemchecklist-entrada',
  imports: [
    MatIconModule
  ],
  templateUrl: './info-itemchecklist-entrada.component.html',
  styleUrl: './info-itemchecklist-entrada.component.css'
})
export class InfoItemchecklistEntradaComponent {

  @Input() status!: string;
  @Input() observacao!: string;
}
