import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-titulo',
  imports: [],
  templateUrl: './titulo.component.html',
  styleUrl: './titulo.component.css'
})
export class TituloComponent {

  @Input() titulo = 'Título';
  @Input() subtitulo = 'Subtítulo';
}
