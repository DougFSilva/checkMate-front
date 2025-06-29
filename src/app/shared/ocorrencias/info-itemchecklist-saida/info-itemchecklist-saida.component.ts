import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-info-itemchecklist-saida',
  imports: [
    MatIconModule
  ],
  templateUrl: './info-itemchecklist-saida.component.html',
  styleUrl: './info-itemchecklist-saida.component.css'
})
export class InfoItemchecklistSaidaComponent {

  @Input() status!: string;
  @Input() observacao!: string;
}
