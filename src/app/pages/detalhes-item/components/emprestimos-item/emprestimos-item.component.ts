import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

import { EmprestimoDetalhado } from '../../../../core/types/EmprestimoResponse';

@Component({
  selector: 'app-emprestimos-item',
  imports: [MatTableModule, MatIconModule],
  templateUrl: './emprestimos-item.component.html',
  styleUrl: './emprestimos-item.component.css'
})
export class EmprestimosItemComponent implements OnInit, OnChanges {

  @Input() emprestimos: EmprestimoDetalhado[] = [];

  displayedColumns: string[] = ['id', 'emprestador', 'solicitante', 'recebedor', 'emprestimo', 'devolucao', 'devolvido' ];
  dataSource = new MatTableDataSource<EmprestimoDetalhado>([]);

  ngOnInit(): void {
    this.dataSource.data = this.emprestimos;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['emprestimos'] && changes['emprestimos'].currentValue) {
      this.dataSource.data = changes['emprestimos'].currentValue;
    }
  }
}
