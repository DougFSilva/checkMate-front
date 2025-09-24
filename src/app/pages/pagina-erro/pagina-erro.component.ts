import { Component } from '@angular/core';
import { BotaoAcaoComponent } from "../../shared/botao-acao/botao-acao.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pagina-erro',
  imports: [
    BotaoAcaoComponent,
    RouterModule
  ],
  templateUrl: './pagina-erro.component.html',
  styleUrl: './pagina-erro.component.css'
})
export class PaginaErroComponent {

}
