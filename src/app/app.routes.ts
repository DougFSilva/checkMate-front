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
import { DetalhesAmbienteComponent } from './pages/detalhes-ambiente/detalhes-ambiente.component';
import { DetalhesCompartimentoComponent } from './pages/detalhes-compartimento/detalhes-compartimento.component';
import { DetalhesItemComponent } from './pages/detalhes-item/detalhes-item.component';
import { ChecklistsAmbienteComponent } from './pages/checklists-ambiente/checklists-ambiente.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Login' }
    },
    {
        path: '',
        component: NavegacaoComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'home',
                component: HomeComponent,
                data: { title: 'Home' }
            },
            {
                path: 'ambientes',
                component: AmbientesComponent,
                data: { title: 'Ambientes' }
            },
            {
                path: 'ambientes/:id',
                component: DetalhesAmbienteComponent,
                data: { title: 'Detalhes do ambiente' }
            },
            {
                path: 'ambientes/:id/checklist',
                component: ChecklistsAmbienteComponent,
                data: { title: 'Checklists do ambiente' }
            },
            {
                path: 'compartimentos/:id',
                component: DetalhesCompartimentoComponent,
                data: { title: 'Detalhes do compartimento' }
            },
            {
                path: 'itens/:id',
                component: DetalhesItemComponent,
                data: { title: 'Detalhes do item' }
            },
            {
                path: 'checklists',
                component: ChecklistsComponent,
                data: { title: 'CheckLists' }
            },
            {
                path: 'ocorrencias',
                component: OcorrenciasComponent,
                data: { title: 'Ocorrências' }
            },
            {
                path: 'emprestimos',
                component: EmprestimosComponent,
                data: { title: 'Empréstimos' }
            },
            {
                path: 'usuarios',
                component: UsuariosComponent,
                data: { title: 'Usuários' }
            }
        ]  
    }
];
