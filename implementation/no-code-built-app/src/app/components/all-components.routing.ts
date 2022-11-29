import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './default/default.component';

import { MasterViewComponent } from './master-view/master-view.component';
import { AbstractViewComponent } from './abstract-view/abstract-view.component';
import { ViewResolver } from '../resolvers/view.resolver';
import { AuthGuard } from '../guards/auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'default/master/view',
        pathMatch: 'full'
    },
    {
        path: 'default',
        component: DefaultComponent,
        children: [
            {
                path: ':id',
                component: AbstractViewComponent,
                resolve: {
                    view: ViewResolver
                },
                canActivate: [AuthGuard]
            },
            {
                path: 'master/view',
                component: MasterViewComponent,
                resolve: {
                    view: ViewResolver
                },
                canActivate: [AuthGuard]
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AllComponentRoutingModule { }