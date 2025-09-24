import { Component, inject, OnInit } from '@angular/core';
import { TiraFotoComponent } from "../../../shared/foto/tira-foto/tira-foto.component";
import { ItemService } from '../../../core/services/item.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fotografa-item',
  imports: [TiraFotoComponent],
  templateUrl: './fotografa-item.component.html',
  styleUrl: './fotografa-item.component.css'
})
export class FotografaItemComponent implements OnInit {

  private service = inject(ItemService);
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
      this.toast.error('ID do item não encontrado na rota.');
    });
  }

  salvarFoto(foto: Blob) {
    console.log(foto)
    const form = new FormData();
    form.append("file", foto);
    this.service.alterarImagemItem(this.id, form).subscribe({
      next: () => {
        this.toast.success('Imagem salva com sucesso', 'SUCESSO');
      },
      error: (err) => {
        this.toast.error(`Erro ao salvar imagem: ${err.error.mensagens}`, 'ERRO');
        console.error(err);
      }
    })
  }
}
