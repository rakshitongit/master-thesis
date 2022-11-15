import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
<% for (let c of children) { %>
import {<%= classify(c) %>Component} from './<%= dasherize(c) %>/<%= dasherize(c) %>.component';<% } %>
import { AllComponentRoutingModule } from './all-components.routing';
import { DefaultComponent } from './default/default.component';
import { AbstractElementComponent } from './abstract-element/abstract-element.component';
import { InputElementComponent } from './input-element/input-element.component';
import { ButtonElementComponent } from './button-element/button-element.component';
import { HttpClientModule } from '@angular/common/http';

// Material design
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTreeModule } from '@angular/material/tree';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AllComponentRoutingModule,
        HttpClientModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatToolbarModule,
        MatGridListModule,
        MatCardModule,
        MatDialogModule,
        MatButtonModule,
        DragDropModule,
        MatTreeModule,
        MatSnackBarModule,
        MatInputModule,
        RouterModule
    ],

    declarations: [<% for (let c of children) { %>
        <%= classify(c) %>Component,<% } %>
        DefaultComponent,
        AbstractElementComponent,
        InputElementComponent,
        ButtonElementComponent
    ],

    exports: [<% for (let c of children) { %>
        <%= classify(c) %>Component,<% } %>
        DefaultComponent,
        AbstractElementComponent,
        InputElementComponent,
        ButtonElementComponent
    ],
    providers: []
})
export class AllComponentsModule { }
// PLEASE DECLARE THIS MODULE TO YOUR ROOT MODULE FILE IMPORTS