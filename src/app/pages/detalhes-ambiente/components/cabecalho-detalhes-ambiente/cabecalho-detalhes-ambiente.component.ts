import { Component, inject, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { Ambiente } from '../../../../core/types/AmbienteResponse';
import { AmbienteService } from '../../../../core/services/ambiente.service';
import { CartaoDetalhesAmbienteComponent } from '../cartao-detalhes-ambiente/cartao-detalhes-ambiente.component';
import { CartaoMetricaAmbienteComponent } from "../cartao-metrica-ambiente/cartao-metrica-ambiente.component";

@Component({
  selector: 'app-cabecalho-detalhes-ambiente',
  imports: [
    MatIconModule,
    MatButtonModule,
    CartaoDetalhesAmbienteComponent,
    CartaoMetricaAmbienteComponent
],
  templateUrl: './cabecalho-detalhes-ambiente.component.html',
  styleUrl: './cabecalho-detalhes-ambiente.component.css'
})
export class CabecalhoDetalhesAmbienteComponent implements OnInit {

  private service = inject(AmbienteService);
  private toast = inject(ToastrService);
  private router = inject(Router);
  @Input() id!: number;

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
    this.ambiente.id = this.id;
    this.buscarAmbientePeloID();
  }

  buscarAmbientePeloID(): void {
    this.service.buscarAmbientePeloId(this.ambiente.id).subscribe(
      {
        next: (resposta) => {
          this.ambiente = resposta;
        },
        error: (err) => {
          this.toast.error(
            `Erro ao buscar ambiente: ${err.error.mensagens} `, 'ERRO');
        }
      }
    )
  }

  navegarParaTelaAmbientes(): void {
    this.router.navigate(['ambientes'])
  }

}
