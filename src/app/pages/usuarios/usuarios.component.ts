import { Component, inject, OnInit } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ContainerPrincipalComponent } from "../../shared/container-principal/container-principal.component";
import { TituloComponent } from "../../shared/titulo/titulo.component";
import { TabelaUsuariosComponent } from "./components/tabela-usuarios/tabela-usuarios.component";
import { UsuarioService } from '../../core/services/usuario.service';
import { UsuarioResponse } from '../../core/types/UsuarioResponse';
import { Pagina } from '../../core/types/Pagina';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmacaoComponent } from '../../shared/dialog/confirmacao/confirmacao.component';

@Component({
  selector: 'app-usuarios',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    ContainerPrincipalComponent,
    TituloComponent,
    TabelaUsuariosComponent
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {

  private service = inject(UsuarioService);
  private toast = inject(ToastrService);
  private dialog = inject(MatDialog);
  paginaUsuarios: Pagina<UsuarioResponse> = {
    content: [],
    pageable: {
      pageNumber: 0,
      pageSize: 0,
      sort: {
        sorted: false,
        unsorted: true,
        empty: true,
      },
      offset: 0,
      paged: false,
      unpaged: true,
    },
    totalElements: 0,
    totalPages: 0,
    last: true,
    first: true,
    numberOfElements: 0,
    size: 0,
    number: 0,
    sort: {
      sorted: false,
      unsorted: true,
      empty: true,
    },
    empty: true,
  }

  opcaoItensPorPagina: number[] = [15, 30, 50];
  pagina: number = 0;
  itensPorPagina: number = this.opcaoItensPorPagina[0];

  ngOnInit(): void {
    this.buscarUsuarios();
  }

  buscarUsuarios(): void {
    this.service.buscarTodosUsuarios(this.pagina, this.itensPorPagina).subscribe({
      next: (resposta) => {
        this.paginaUsuarios = resposta;
      },
      error: (err) => {
        this.toast.error(`Erro ao buscar usuários: ${err.error.mensagens}`);
        console.error(`Erro: ${err}`)
      }
    })
  }

  abrirDialogDeletarUsuario(usuario: UsuarioResponse): void {
    let dialog = this.dialog.open(ConfirmacaoComponent,
      {data: {texto: `Deseja realmente deletar o usuário ${usuario.nome}?`}});
    dialog.afterClosed().subscribe({
      next: (resposta) => {
        if (resposta) this.deletarUsuario(usuario.id);
      }
    })
  }

  deletarUsuario(id: number):void {
    this.service.deletarUsuario(id).subscribe({
      next: () => {
        this.toast.success('Usuário deletado com sucesso', 'SUCESSO');
        const event = new PageEvent();
        event.pageIndex = this.pagina;
        event.pageSize = this.itensPorPagina;
        this.atualizarPaginacao(event);
      },
      error: (err) => {
        this.toast.error(`Erro ao deletar usuário: ${err.error.mensagens}`, 'ERRO');
        console.error(err);
      }
    })
  }

  atualizarPaginacao(event: PageEvent): void {
    this.pagina = event.pageIndex;
    this.itensPorPagina = event.pageSize;
    this.buscarUsuarios();
  }

}
