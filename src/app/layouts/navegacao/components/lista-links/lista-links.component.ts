import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista-links',
  imports: [
    MatIconModule,
    MatBadgeModule,
    RouterModule
  ],
  templateUrl: './lista-links.component.html',
  styleUrl: './lista-links.component.css'
})
export class ListaLinksComponent {

  @Output() fecharSideNavSeModoOver = new EventEmitter<void>();
  @Input() ocorrenciasAbertas!: number;
}
