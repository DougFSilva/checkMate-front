import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { UsuarioService } from '../../../core/services/usuario.service';
import { UsuarioResponse } from '../../../core/types/UsuarioResponse';
import { DatePipe } from '@angular/common';
import { CpfPipe } from '../../pipe/cpf.pipe';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cartao-dados-usuario',
  imports: [
    DatePipe,
    CpfPipe,
    MatIconModule 
  ],
  templateUrl: './cartao-dados-usuario.component.html',
  styleUrl: './cartao-dados-usuario.component.css'
})
export class CartaoDadosUsuarioComponent implements OnInit{
  
  private data = inject(MAT_DIALOG_DATA);
  private service = inject(UsuarioService);
  private toast = inject(ToastrService);
  usuario: Partial<UsuarioResponse> = {};

  ngOnInit(): void {
    this.buscarUsuario();
  }

  buscarUsuario(): void {
    this.service.buscarUsuarioPeloID(this.data.id).subscribe({
      next: (response) => {
        this.usuario = response;
      },
      error: (err) => {
        this.toast.error(`Erro ao buscar usuário: ${err.error.mensagens}`);
        console.error(err);
      }
    })
  }
}
