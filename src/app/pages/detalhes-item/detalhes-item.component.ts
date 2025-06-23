import { Component, inject, OnInit } from '@angular/core';
import { ContainerPrincipalComponent } from "../../shared/container-principal/container-principal.component";
import { CartaoComponent } from "../../shared/cartao/cartao.component";
import { ItemService } from '../../core/services/item.service';
import { ItemDetalhado } from '../../core/types/ItemResponse';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { API_CONFIG } from '../../config/API_CONFIG';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-detalhes-item',
  imports: [
    ContainerPrincipalComponent, 
    CartaoComponent,
    MatIconModule
  ],
  templateUrl: './detalhes-item.component.html',
  styleUrl: './detalhes-item.component.css'
})
export class DetalhesItemComponent implements OnInit{

  private service = inject(ItemService);
  private route = inject(ActivatedRoute);
  private toast = inject(ToastrService);
  baseUrl = API_CONFIG.baseUrl;
  
  item: ItemDetalhado = {
    id: 0,
    compartimento: {
      id: 0,
      codigo: '',
      nome: '',
      descricao: '',
      imagem: ''
    },
    descricao: '',
    quantidade: 0,
    verificavel: false,
    imagem: ''
  }

  ngOnInit(): void {
     this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.item.id = Number(id);
        this.buscarItemPeloId();
        return;
      }
      this.toast.error('ID do item não encontrado na rota.');
    })
  }

  buscarItemPeloId() {
    this.service.buscarItemPeloID(this.item.id).subscribe(
      {
        next: (resultado) => {
          this.item = resultado;
        },
        error: (err) => {
          this.toast.error(`Erro ao buscar item: ${err.error.mensagens}`, 'ERRO');
        }
      }
    )
  }

}
