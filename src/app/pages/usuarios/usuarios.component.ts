import { Component, inject, OnInit } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, Subject, debounceTime } from 'rxjs';

import { ContainerPrincipalComponent } from "../../shared/container-principal/container-principal.component";
import { TituloComponent } from "../../shared/titulo/titulo.component";
import { TabelaUsuariosComponent } from "./components/tabela-usuarios/tabela-usuarios.component";
import { UsuarioService } from '../../core/services/usuario.service';
import { UsuarioResponse } from '../../core/types/UsuarioResponse';
import { Pagina } from '../../core/types/Pagina';
import { ConfirmacaoComponent } from '../../shared/dialog/confirmacao/confirmacao.component';
import { BotaoAcaoComponent } from "../../shared/botao-acao/botao-acao.component";
import { CadastrarUsuarioComponent } from '../../shared/usuario/cadastrar-usuario/cadastrar-usuario.component';
import { EditarUsuarioComponent } from '../../shared/usuario/editar-usuario/editar-usuario.component';

@Component({
  selector: 'app-usuarios',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    ContainerPrincipalComponent,
    TituloComponent,
    TabelaUsuariosComponent,
    BotaoAcaoComponent,
    MatInputModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {

  private service = inject(UsuarioService);
  private toast = inject(ToastrService);
  private dialog = inject(MatDialog);
  paginaUsuarios: Partial<Pagina<UsuarioResponse>> = {};

  opcaoItensPorPagina: number[] = [15, 30, 50];
  pagina: number = 0;
  itensPorPagina: number = this.opcaoItensPorPagina[0];
  filtroNome = '';
  public filtroSubject = new Subject<void>();

  ngOnInit(): void {
    this.buscarUsuarios();
    this.filtroSubject
      .pipe(
        debounceTime(500),           
      )
      .subscribe(() => {
        this.buscarUsuarios();
      });
  }

  buscarUsuarios(): void {
    let observable: Observable<Pagina<UsuarioResponse>>;
    if (this.filtroNome) {
      observable = this.service.buscarUsuariosPeloNome(this.filtroNome, this.pagina, this.itensPorPagina);
    } else {
      observable = this.service.buscarTodosUsuarios(this.pagina, this.itensPorPagina);
    }
    observable.subscribe(
      {
        next: (resposta) => {
          this.paginaUsuarios = resposta;
        },
        error: (err) => {
          this.toast.error(`Erro ao buscar usuários: ${err.error.mensagens}`);
          console.error(err);
        }
      }
    )
  }

  abrirDialogDeletar(usuario: UsuarioResponse): void {
    let dialog = this.dialog.open(ConfirmacaoComponent,
      { data: { texto: `Deseja realmente deletar o usuário ${usuario.nome}?` } });
    dialog.afterClosed().subscribe({
      next: (resposta) => {
        if (resposta) this.deletarUsuario(usuario.id);
      }
    })
  }

  deletarUsuario(id: number): void {
    this.service.deletarUsuario(id).subscribe({
      next: () => {
        this.toast.success('Usuário deletado com sucesso', 'SUCESSO');
        this.atualizarPaginacaoAtual();
      },
      error: (err) => {
        this.toast.error(`Erro ao deletar usuário: ${err.error.mensagens}`, 'ERRO');
        console.error(err);
      }
    })
  }

  abrirDialogCadastrar(): void {
    let dialog = this.dialog.open(CadastrarUsuarioComponent);
    dialog.afterClosed().subscribe({
      next: (resposta) => {
        if (resposta) this.atualizarPaginacaoAtual();
      }
    });
  }

  abrirDialogEditar(usuario: UsuarioResponse): void {
    let dialog = this.dialog.open(EditarUsuarioComponent,
      { data: { id: usuario.id } });
    dialog.afterClosed().subscribe({
      next: (resposta) => {
        if (resposta) this.atualizarPaginacaoAtual();
      }
    });
  }

  atualizarPaginacao(event: PageEvent): void {
    this.pagina = event.pageIndex;
    this.itensPorPagina = event.pageSize;
    this.buscarUsuarios();
  }

  atualizarPaginacaoAtual(): void {
    const event = new PageEvent();
    event.pageIndex = this.pagina;
    event.pageSize = this.itensPorPagina;
    this.atualizarPaginacao(event);
  }

}
