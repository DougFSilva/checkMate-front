import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { AmbienteService } from '../../../core/services/ambiente.service';

import { TiraFotoComponent } from "../../../shared/foto/tira-foto/tira-foto.component";

@Component({
  selector: 'app-fotografa-ambiente',
  imports: [TiraFotoComponent],
  templateUrl: './fotografa-ambiente.component.html',
  styleUrl: './fotografa-ambiente.component.css'
})
export class FotografaAmbienteComponent  implements OnInit {

  private service = inject(AmbienteService);
  private toast = inject(ToastrService);
  private route = inject(ActivatedRoute);
  id: number = 0;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.id = Number(id);
        return;
      }
      this.toast.error('ID do ambiente não encontrado na rota.');
    });
  }

  salvarFoto(foto: Blob) {
    console.log(foto)
    const form = new FormData();
    form.append("file", foto);
    this.service.alterarImagemAmbiente(this.id, form).subscribe({
      next: () => {
        this.toast.success('Imagem salva com sucesso', 'SUCESSO');
      },
      error: (err) => {
        this.toast.error(`Erro ao salvar imagem: ${err.error.mensagens}`, 'ERRO');
      }
    })
  }
}
