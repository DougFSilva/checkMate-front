import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs'; // Importe Subject e Subscription
import { debounceTime, distinctUntilChanged, skip } from 'rxjs/operators'; // Importe os operadores

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { CriarAmbienteComponent } from '../../../../shared/ambiente/criar-ambiente/criar-ambiente.component';
import { BotaoAcaoComponent } from '../../../../shared/botao-acao/botao-acao.component';

@Component({
  selector: 'app-cabecalho-ambientes',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    BotaoAcaoComponent
  ],
  templateUrl: './cabecalho-ambientes.component.html',
  styleUrl: './cabecalho-ambientes.component.css'
})
export class CabecalhoAmbientesComponent implements OnInit, OnDestroy {

  @Output() nomeAmbiente = new EventEmitter<string>();

  private dialog = inject(MatDialog);
  private fluxoBusca  = new BehaviorSubject<string>('');
  private inscricaoBusca: Subscription | undefined;

  ngOnInit(): void {
    this.inscricaoBusca = this.fluxoBusca.pipe(
      skip(1),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(valor => {
      this.nomeAmbiente.emit(valor);
    });
  }

  ngOnDestroy(): void {
    if (this.inscricaoBusca) {
      this.inscricaoBusca.unsubscribe();
    }
    this.fluxoBusca.complete();
  }

  atualizarNome(nome: string): void {
    this.fluxoBusca.next(nome);
  }

  limparBusca(): void {
    this.fluxoBusca.next('');
  }

  abrirDialogCriarAmbiente(): void {
    const dialog = this.dialog.open(CriarAmbienteComponent);
    dialog.afterClosed().subscribe({
      next: (resposta) => {
        if(resposta) this.nomeAmbiente.emit('');
      }
    });
  }
}