import { Routes } from '@angular/router';
import { NavegacaoComponent } from './layouts/navegacao/navegacao.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: NavegacaoComponent,
        canActivate: [authGuard],
        children: [
            
        ]  
    }
];
