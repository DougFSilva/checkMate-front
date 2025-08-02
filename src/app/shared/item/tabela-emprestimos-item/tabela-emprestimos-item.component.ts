import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EmprestimoDetalhado } from '../../../core/types/EmprestimoResponse';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tabela-emprestimos-item',
  imports: [MatTableModule, MatIconModule],
  templateUrl: './tabela-emprestimos-item.component.html',
  styleUrl: './tabela-emprestimos-item.component.css'
})
export class TabelaEmprestimosItemComponent implements OnInit, OnChanges {

  @Input() emprestimos: EmprestimoDetalhado[] = [];

  displayedColumns: string[] = ['emprestimo','emprestador', 'solicitante', 'recebedor', 'devolucao', 'devolvido' ];
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

