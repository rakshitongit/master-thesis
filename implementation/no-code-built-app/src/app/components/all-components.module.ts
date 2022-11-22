import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRouteSnapshot, RouterModule } from '@angular/router';

import { MasterViewComponent } from './master-view/master-view.component';
import { AllComponentRoutingModule } from './all-components.routing';
import { DefaultComponent } from './default/default.component';
import { AbstractElementComponent } from './ui-elements/abstract-element/abstract-element.component';
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
import { HelperService } from '../services/helper.service';
import { InputElementComponent } from './ui-elements/input-element/input-element.component';
import { ButtonElementComponent } from './ui-elements/button-element/button-element.component';
import { SelectElementComponent } from './ui-elements/select-element/select-element.component';
import { AbstractViewComponent } from './abstract-view/abstract-view.component';
import { ViewResolver } from '../resolvers/view.resolver';

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
        RouterModule,
        ReactiveFormsModule
    ],

    declarations: [
        MasterViewComponent,
        DefaultComponent,
        AbstractElementComponent,
        InputElementComponent,
        ButtonElementComponent,
        SelectElementComponent,
        AbstractViewComponent
    ],

    exports: [
        MasterViewComponent,
        DefaultComponent,
        AbstractElementComponent,
        InputElementComponent,
        ButtonElementComponent,
        SelectElementComponent
    ],
    providers: [
        HelperService,
        ViewResolver
    ]
})
export class AllComponentsModule { }
// PLEASE DECLARE THIS MODULE TO YOUR ROOT MODULE FILE IMPORTS