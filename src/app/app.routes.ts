import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

import { NavegacaoComponent } from './layouts/navegacao/navegacao.component';
import { LoginComponent } from './pages/login/login.component';
import { AmbientesComponent } from './pages/ambientes/ambientes.component';
import { HomeComponent } from './pages/home/home.component';
import { OcorrenciasComponent } from './pages/ocorrencias/ocorrencias.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { DetalhesAmbienteComponent } from './pages/detalhes-ambiente/detalhes-ambiente.component';
import { DetalhesCompartimentoComponent } from './pages/detalhes-compartimento/detalhes-compartimento.component';
import { DetalhesItemComponent } from './pages/detalhes-item/detalhes-item.component';
import { ChecklistsAmbienteComponent } from './pages/checklists-ambiente/checklists-ambiente.component';
import { ChecklistsCompartimentoComponent } from './pages/checklists-compartimento/checklists-compartimento.component';
import { PreencheChecklistEntradaComponent } from './pages/preenche-checklist/preenche-checklist-entrada/preenche-checklist-entrada.component';
import { PreencheChecklistSaidaComponent } from './pages/preenche-checklist/preenche-checklist-saida/preenche-checklist-saida.component';
import { DetalhesOcorrenciaComponent } from './pages/detalhes-ocorrencia/detalhes-ocorrencia.component';
import { FotografaItemComponent } from './pages/item/fotografa-item/fotografa-item.component';
import { FotografaAmbienteComponent } from './pages/ambientes/fotografa-ambiente/fotografa-ambiente.component';
import { FotografaCompartimentoComponent } from './pages/compartimentos/fotografa-compartimento/fotografa-compartimento.component';
import { AlteraSenhaComponent } from './pages/altera-senha/altera-senha.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Login' }
    },
    {
        path: 'alterar-senha',
        component: AlteraSenhaComponent,
        data: { title: 'Alterar senha' }
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
                path: 'ambientes/:id/checklists',
                component: ChecklistsAmbienteComponent,
                data: { title: 'Checklists por ambiente' }
            },
            {
                path: 'checklist-ambiente/:id/checklists-compartimento',
                component: ChecklistsCompartimentoComponent,
                data: { title: 'Checklist de ambiente' }
            },
            {
                path: 'checklist-compartimento/:id/preencher-entrada',
                component: PreencheChecklistEntradaComponent,
                data: { title: 'Checklist de entrada' }
            },
            {
                path: 'checklist-compartimento/:id/preencher-saida',
                component: PreencheChecklistSaidaComponent,
                data: { title: 'Checklist de saída' }
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
                path: 'ocorrencias',
                component: OcorrenciasComponent,
                data: { title: 'Ocorrências' }
            },
            {
                path: 'ocorrencia/:id',
                component: DetalhesOcorrenciaComponent,
                data: { title: 'Detalhes da ocorrência' }
            },
            {
                path: 'usuarios',
                component: UsuariosComponent,
                data: { title: 'Usuários' }
            },
            {
                path: 'itens/:id/fotografar',
                component: FotografaItemComponent,
                data: { title: 'Fotografar Item' }
            },
            {
                path: 'ambientes/:id/fotografar',
                component: FotografaAmbienteComponent,
                data: { title: 'Fotografar Ambiente' }
            },
            {
                path: 'compartimentos/:id/fotografar',
                component: FotografaCompartimentoComponent,
                data: { title: 'Fotografar Compartimento' }
            },
            {
                path: '',
                component: HomeComponent,
                data: { title: 'Home' }
            },
        ]
    }
];
