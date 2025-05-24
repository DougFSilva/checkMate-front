import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AmbienteService } from '../../core/services/ambiente.service';
import { Ambiente } from '../../core/types/AmbienteResponse';
import { API_CONFIG } from '../../config/API_CONFIG';
import { ContainerPrincipalComponent } from '../../shared/container-principal/container-principal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EditarAmbienteComponent } from '../editar-ambiente/editar-ambiente.component';
import { MatDialog } from '@angular/material/dialog';
import { CabecalhoDetalhesAmbienteComponent } from './components/cabecalho-detalhes-ambiente/cabecalho-detalhes-ambiente.component';

@Component({
  selector: 'app-detalhes-ambiente',
  imports: [
    ContainerPrincipalComponent,
    MatButtonModule,
    MatIconModule,
    CabecalhoDetalhesAmbienteComponent
  ],
  templateUrl: './detalhes-ambiente.component.html',
  styleUrl: './detalhes-ambiente.component.css'
})
export class DetalhesAmbienteComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private toast = inject(ToastrService);
  private service = inject(AmbienteService);
  private dialog = inject(MatDialog);
  baseUrl: string = API_CONFIG.baseUrl;
  id!: number;

  ambiente: Ambiente = {
    id: 0,
    nome: '',
    descricao: '',
    localizacao: '',
    imagem: '',
    contagemCompartimentos: 0,
    contagemItens: 0
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.ambiente.id = Number(id);
        this.buscarAmbientePeloID();
        return;
      } 
      this.toast.error('ID do ambiente não encontrado na rota.');
      
    })
  }

  buscarAmbientePeloID(): void {
    this.service.buscarAmbientePeloId(this.ambiente.id).subscribe(
      {
        next: (resposta) => {
          this.ambiente = resposta;
        },
        error: (err) => {
          this.toast.error(
            `Erro ao buscar ambiente: ${err.error.mensagens} `, 'ERRO' );
        }
      }
    )
  }


}
