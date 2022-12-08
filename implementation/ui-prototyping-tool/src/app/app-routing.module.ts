import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataModelComponent } from './components/data-model/data-model.component';
import { DefaultPageComponent } from './components/default-page/default-page.component';
import { ExperimentDetailComponent } from './components/experiment-components/experiment-detail/experiment-detail.component';
import { ExperimentVariantsComponent } from './components/experiment-components/experiment-variants/experiment-variants.component';
import { ExperimentsComponent } from './components/experiment-components/experiments/experiments.component';
import { TasksComponent } from './components/experiment-components/tasks/tasks.component';
import { PrototypingComponent } from './components/prototyping/prototyping.component';
import { UsersComponent } from './components/users/users.component';
import { SingleExperimentResolver } from './resolvers/single-experiment.resolver';
import { SingleVariantResolver } from './resolvers/single-variant.resolver';

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
            },
            {
                path: 'experiments/:id',
                component: ExperimentVariantsComponent,
                resolve: {
                    experiment: SingleExperimentResolver
                }
            },
            {
                path: 'experiments/:id/tasks/view',
                component: TasksComponent,
                resolve: {
                    experiment: SingleExperimentResolver
                }
            },
            {
                path: 'experiments/:id/:variantId',
                component: ExperimentDetailComponent,
                resolve: {
                    experiment: SingleExperimentResolver,
                    variant: SingleVariantResolver
                }                
            },
            {
                path: 'users',
                component: UsersComponent
            },
            {
                path: 'data-model',
                component: DataModelComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
