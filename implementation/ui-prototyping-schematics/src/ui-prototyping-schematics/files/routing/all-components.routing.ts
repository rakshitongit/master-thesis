import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './default/default.component';
<% for (let c of children) { %>
import {<%= classify(c) %>Component} from './<%= dasherize(c) %>/<%= dasherize(c) %>.component';<% } %>

const routes: Routes = [
    {
        path: '',
        redirectTo: 'default/master-view',
        pathMatch: 'full'
    },
    {
        path: 'default',
        component: DefaultComponent,
        children: [
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },
            <% for (let c of children) { %>
            {
                path: '<%= dasherize(c) %>',
                component: <%= classify(c) %>Component
            },<% }%>
        ]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AllComponentRoutingModule { }