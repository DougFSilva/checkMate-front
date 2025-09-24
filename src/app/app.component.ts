import { Component, HostListener, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebsocketService } from './core/services/websocket.service';
import { Subscription } from 'rxjs';
import { TokenService } from './core/services/token.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'checkmate-front';
  private tokenService = inject(TokenService);
  private websocketService = inject(WebsocketService);

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: Event): void {
    this.websocketService.desconectar();
  }

  ngOnInit(): void {
    console.log(new Date(this.tokenService.getExp() * 1000));
  }
}
