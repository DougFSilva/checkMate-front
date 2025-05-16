import { Routes } from '@angular/router';
import { NavegacaoComponent } from './layouts/navegacao/navegacao.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './core/guard/auth.guard';
import { AmbientesComponent } from './pages/ambientes/ambientes.component';
import { HomeComponent } from './pages/home/home.component';
import { ChecklistsComponent } from './pages/checklists/checklists.component';
import { OcorrenciasComponent } from './pages/ocorrencias/ocorrencias.component';
import { EmprestimosComponent } from './pages/emprestimos/emprestimos.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

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
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'ambientes',
                component: AmbientesComponent
            },
            {
                path: 'checklists',
                component: ChecklistsComponent
            },
            {
                path: 'ocorrencias',
                component: OcorrenciasComponent
            },
            {
                path: 'emprestimos',
                component: EmprestimosComponent
            },
            {
                path: 'usuarios',
                component: UsuariosComponent
            }
        ]  
    }
];
