import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

import { UsuarioResponse } from '../../../../core/types/UsuarioResponse';

@Component({
  selector: 'app-tabela-usuarios',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule
  ],
  templateUrl: './tabela-usuarios.component.html',
  styleUrl: './tabela-usuarios.component.css'
})
export class TabelaUsuariosComponent implements OnInit, OnChanges {

  @Input() usuarios: UsuarioResponse[] = [];
  @Output() deletarUsuario = new EventEmitter<UsuarioResponse>();
  @Output() editarUsuario = new EventEmitter<UsuarioResponse>();
  displayedColumns: string[] = ['id', 'nome', 'CPF', 'email', 'senhaAlterada', 'perfil', 'dataValidade', 'comandos'];
  dataSource = new MatTableDataSource<UsuarioResponse>();

  ngOnInit(): void {
    this.dataSource.data = this.usuarios;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usuarios'] && changes['usuarios'].currentValue) {
      this.dataSource.data = this.usuarios;
    }
  }
}