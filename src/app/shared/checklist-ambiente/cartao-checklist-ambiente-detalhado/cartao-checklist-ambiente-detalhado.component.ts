import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { ChecklistAmbienteService } from '../../../core/services/checklist-ambiente.service';
import { ChecklistAmbienteDetalhado } from '../../../core/types/CheckListAmbienteResponse';
import { API_CONFIG } from '../../../config/API_CONFIG';

@Component({
  selector: 'app-cartao-checklist-ambiente-detalhado',
  imports: [],
  templateUrl: './cartao-checklist-ambiente-detalhado.component.html',
  styleUrl: './cartao-checklist-ambiente-detalhado.component.css'
})
export class CartaoChecklistAmbienteDetalhadoComponent implements OnInit {

  private data = inject(MAT_DIALOG_DATA);
  private service = inject(ChecklistAmbienteService);
  private toast = inject(ToastrService);
  baseUrl = API_CONFIG.baseUrl + '/imagens/';
  id!: number;
  checklist: ChecklistAmbienteDetalhado = {
    id: 0,
    ambiente: {
      id: 0,
      nome: '',
      descricao: '',
      localizacao: '',
      imagem: ''
    },
    dataHoraAbertura: new Date(),
    dataHoraLiberacao: new Date(),
    dataHoraEncerramento: new Date(),
    responsavelAbertura: {
      ID: 0,
      email: '',
      nome: '',
      perfil: '',
    },
    responsavelLiberacao: {
      ID: 0,
      email: '',
      nome: '',
      perfil: '',
    },
     responsavelEncerramento: {
      ID: 0,
      email: '',
      nome: '',
      perfil: '',
    },
    status: ''
  }

  ngOnInit(): void {
    this.id = this.data.id;
    this.buscarChecklistAmbientePeloId();
  }

  buscarChecklistAmbientePeloId(): void {
    this.service.buscarChecklistDeAmbientePeloId(this.id).subscribe(
      {
        next: (resposta) => {
          this.checklist = resposta;
        },
        error: (err) => {
          this.toast.error(`Erro ao buscar checklist: ${err.error.mensagens}`, 'ERRO');
        }
      }
    )
  }

}
