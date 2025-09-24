import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { TokenService } from '../services/token.service';
import { WebsocketService } from '../services/websocket.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const websocketService = inject(WebsocketService);
  if (tokenService.getToken()) {
    if (!websocketService.isConectado()) {
      websocketService.conectar().subscribe({
        next: () => console.log('Conexão WebSocket estabelecida'),
        error: (err) => console.error('Erro ao conectar WebSocket', err)
      });
    }
    return true;
  }
  return router.parseUrl('/login');
};
