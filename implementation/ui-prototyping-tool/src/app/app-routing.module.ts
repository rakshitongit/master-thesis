import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultPageComponent } from './components/default-page/default-page.component';
import { ExperimentsComponent } from './components/experiments/experiments.component';
import { PrototypingComponent } from './components/prototyping/prototyping.component';

const routes: Routes = [
    {
        path: '',
        component: DefaultPageComponent,
        children: [
            {
                path: 'experiments',
                component: ExperimentsComponent
            },
            {
                path: '',
                component: PrototypingComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
