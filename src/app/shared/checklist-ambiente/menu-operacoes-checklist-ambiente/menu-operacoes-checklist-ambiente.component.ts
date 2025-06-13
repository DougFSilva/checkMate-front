import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import { ConfirmacaoComponent } from '../../dialog/confirmacao/confirmacao.component';
import { ChecklistAmbienteService } from '../../../core/services/checklist-ambiente.service';

@Component({
  selector: 'app-menu-operacoes-checklist-ambiente',
  imports: [
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './menu-operacoes-checklist-ambiente.component.html',
  styleUrl: './menu-operacoes-checklist-ambiente.component.css'
})
export class MenuOperacoesChecklistAmbienteComponent {

  private service = inject(ChecklistAmbienteService);
  private toast = inject(ToastrService);
  private dialog = inject(MatDialog);
  @Output() checklistLiberado = new EventEmitter<void>();
  @Output() checklistEncerrado = new EventEmitter<void>();
  @Output() checklistDeletado = new EventEmitter<void>();
  @Input() id!: number;
  @Input() status!: string;

  abrirDialogLiberarChecklist(): void {
    const dialog = this.dialog.open(ConfirmacaoComponent,
      { data: { 'texto': `Deseja realmente liberar o checklist #${this.id}` } });
    dialog.afterClosed().subscribe({
      next: (resposta) => {
        if (resposta) this.liberarChecklist();
      }
    })
  }

  liberarChecklist(): void {
    this.service.liberarChecklistDeAmbiente(this.id).subscribe(
      {
        next: (resposta) => {
          this.toast.success('Checklist liberado com sucesso', 'SUCESSO');
          this.checklistLiberado.emit();
        },
        error: (err) => {
          this.toast.error(`Erro ao liberar checklist: ${err.error.mensagens}`, 'ERRO');
        }
      }
    )
  }

  abrirDialogDeletarCheckList(): void {
    const dialog = this.dialog.open(ConfirmacaoComponent,
      { data: { 'texto': `Deseja realmente deletar o checklist #${this.id}` } });
    dialog.afterClosed().subscribe({
      next: (resposta) => {
        if (resposta) this.deletarChecklist();
      }
    })
  }

  deletarChecklist(): void {
    this.service.deletarChecklistDeAmbiente(this.id).subscribe(
      {
        next: () => {
          this.toast.success('Checklist deletado com sucesso', 'SUCESSO');
          this.checklistDeletado.emit();
        },
        error: (err) => {
          this.toast.error(`Erro ao deletar checklist: ${err.error.mensagens}`, 'ERRO');
        }
      }
    )
  }

  abrirDialogEncerrarChecklist(): void {
    const dialog = this.dialog.open(ConfirmacaoComponent,
      { data: { 'texto': `Deseja realmente encerrar o checklist #${this.id}` } });
    dialog.afterClosed().subscribe({
      next: (resposta) => {
        if (resposta) this.encerrarChecklist();
      }
    })
  }

  encerrarChecklist(): void {
    this.service.encerrarChecklistDeAmbiente(this.id).subscribe(
      {
        next: () => {
          this.toast.success('Checklist encerrado com sucesso', 'SUCESSO');
          this.checklistEncerrado.emit();
        },
        error: (err) => {
          this.toast.error(`Erro ao encerrr checklist: ${err.error.mensagens}`, 'ERRO');
        }
      }
    )
  }
}
