import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebsocketService } from './core/services/websocket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'checkmate-front';

  private websocketService = inject(WebsocketService);
  private subscription = new Subscription();

  ngOnInit(): void {
    this.subscription.add(this.websocketService.conectar().subscribe({
      next: () => {
        console.log('Conexão WebSocket principal estabelecida.');
      },
      error: (err) => console.error('Erro na conexão do WebSocket:', err)
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.websocketService.desconectar();
  }
}
