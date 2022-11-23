import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { DefaultPageComponent } from './default-page/default-page.component';
import { AbstractUiComponentComponent } from './abstract-ui-component/abstract-ui-component.component';
import { ButtonElementComponent } from './ui-elements/button-element/button-element.component';
import { DialogOverviewExampleDialog, LeftPanelComponent } from './left-panel/left-panel.component';
import { RightPanelComponent } from './right-panel/right-panel.component';
import { MiddlePanelComponent } from './middle-panel/middle-panel.component';

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
import { FormsModule } from '@angular/forms';
import { AddOptionDialogComponent, SelectElementComponent } from './ui-elements/select-element/select-element.component';
import { InputElementComponent } from './ui-elements/input-element/input-element.component';
import { ExperimentsComponent } from './experiments/experiments.component';
import { PrototypingComponent } from './prototyping/prototyping.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
    declarations: [
        AbstractUiComponentComponent,
        SideBarComponent,
        DefaultPageComponent,
        ButtonElementComponent,
        LeftPanelComponent,
        RightPanelComponent,
        MiddlePanelComponent,
        DialogOverviewExampleDialog,
        InputElementComponent,
        SelectElementComponent,
        AddOptionDialogComponent,
        ExperimentsComponent,
        PrototypingComponent
    ],
    imports: [
        CommonModule,
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
        FormsModule,
        AppRoutingModule
    ],
    exports: [AbstractUiComponentComponent, SideBarComponent, DefaultPageComponent, ButtonElementComponent, DialogOverviewExampleDialog, LeftPanelComponent, RightPanelComponent, AddOptionDialogComponent]
})
export class AllComponentModule { }
