import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { EmprestimoDetalhado, EmprestimoResumo } from '../../../core/types/EmprestimoResponse';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

import { EmprestimoService } from '../../../core/services/emprestimo.service';
import { ConfirmacaoComponent } from '../../dialog/confirmacao/confirmacao.component';

@Component({
  selector: 'app-tabela-emprestimos-item',
  imports: [
    MatTableModule, 
    MatIconModule,
    DatePipe
  ],
  templateUrl: './tabela-emprestimos-item.component.html',
  styleUrl: './tabela-emprestimos-item.component.css'
})
export class TabelaEmprestimosItemComponent implements OnInit, OnChanges {

  @Input() emprestimos: EmprestimoDetalhado[] = [];
  @Output() itemDevolvido = new EventEmitter<void>();
  private service = inject(EmprestimoService);
  private toast = inject(ToastrService);
  private dialog = inject(MatDialog);
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

  abrirDialogDevolverItem(emprestimo: EmprestimoResumo): void {
    let dialog = this.dialog.open(ConfirmacaoComponent, 
      {data: {'texto': `Deseja realmente devolver o item ${emprestimo.item.descricao}?`}});
    dialog.afterClosed().subscribe({
      next: (resposta) => {
        if (resposta) this.devolverItem(emprestimo);
      }
    })
  }

  devolverItem(emprestimo: EmprestimoResumo): void {
    this.service.devolverItem(emprestimo.id).subscribe({
      next: () => {
        this.toast.success('Item devolvido com sucesso', 'SUCESSO');
        this.itemDevolvido.emit();
      },
      error: (err) => {
        this.toast.error(`Erro ao devolver item: ${err.error.mensagens}`, 'ERRO');
      }
    })
  }
}

