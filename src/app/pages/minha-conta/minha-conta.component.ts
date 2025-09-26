import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrService } from 'ngx-toastr';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

import { UsuarioService } from '../../core/services/usuario.service';
import { UsuarioResponse } from '../../core/types/UsuarioResponse';
import { ContainerPrincipalComponent } from "../../shared/container-principal/container-principal.component";
import { TituloComponent } from "../../shared/titulo/titulo.component";
import { CartaoComponent } from "../../shared/cartao/cartao.component";
import { BotaoAcaoComponent } from "../../shared/botao-acao/botao-acao.component";
import { AlterarSenhaMinhaContaComponent } from './components/alterar-senha-minha-conta/alterar-senha-minha-conta.component';
import { CpfPipe } from '../../shared/pipe/cpf.pipe';

@Component({
  selector: 'app-minha-conta',
  imports: [
    ContainerPrincipalComponent,
    TituloComponent,
    CartaoComponent,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    DatePipe,
    BotaoAcaoComponent,
    CpfPipe
  ],
  templateUrl: './minha-conta.component.html',
  styleUrl: './minha-conta.component.css'
})
export class MinhaContaComponent implements OnInit {

  private service = inject(UsuarioService);
  private dialog = inject(MatDialog);
  private toast = inject(ToastrService);
  usuario: Partial<UsuarioResponse> = {};

  ngOnInit(): void {
    this.buscarUsuario();
  }

  buscarUsuario(): void {
    this.service.buscarUsuarioAutenticado().subscribe({
      next: (response) => {
        this.usuario = response;
      },
      error: (err) => {
        this.toast.error(err.error.mensagens);
        console.error(err);
      }
    })
  }

  abrirDialogAlterarSenha(): void {
    this.dialog.open(AlterarSenhaMinhaContaComponent, 
      {data: {email: this.usuario.email}});
  }
}
