import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginacao',
  imports: [MatPaginatorModule],
  templateUrl: './paginacao.component.html',
  styleUrl: './paginacao.component.css'
})
export class PaginacaoComponent {

  @Input() totalElementos!: number;
  @Input() opcaoItensPorPagina!: number[];
  @Output() pageEvent = new EventEmitter<PageEvent>();

  atualizarPaginacao(event: PageEvent) {
    this.pageEvent.emit(event);
  }

}
