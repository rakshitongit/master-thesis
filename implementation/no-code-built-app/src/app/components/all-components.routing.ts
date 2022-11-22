import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './default/default.component';

import {MasterViewComponent} from './master-view/master-view.component';
import {V1Component} from './v1/v1.component';
import {TestComponent} from './test/test.component';
import {V2Component} from './v2/v2.component';
import { AbstractViewComponent } from './abstract-view/abstract-view.component';
import { ViewResolver } from '../resolvers/view.resolver';

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
                }
            },
            {
                path: 'master/view',
                component: MasterViewComponent,
                resolve: {
                    view: ViewResolver
                }
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AllComponentRoutingModule { }