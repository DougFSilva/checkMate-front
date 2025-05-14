import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';

import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-navegacao',
  imports: [
    MatSidenavModule, 
    MatButtonModule, 
    MatIconModule,
    ToolbarComponent
  ],
  templateUrl: './navegacao.component.html',
  styleUrl: './navegacao.component.css'
})
export class NavegacaoComponent {

  
}
