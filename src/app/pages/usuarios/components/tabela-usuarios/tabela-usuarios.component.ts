import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioResponse } from '../../../../core/types/UsuarioResponse';

@Component({
  selector: 'app-tabela-usuarios',
  imports: [],
  templateUrl: './tabela-usuarios.component.html',
  styleUrl: './tabela-usuarios.component.css'
})
export class TabelaUsuariosComponent implements OnInit, OnChanges {
  @Input() emprestimos: UsuarioResponse[] = [];
  displayedColumns: string[] = ['nome', 'CPF', 'email', 'senhaAlterada', 'perfil', 'dataValidade'];
  dataSource = new MatTableDataSource<UsuarioResponse>();

  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}