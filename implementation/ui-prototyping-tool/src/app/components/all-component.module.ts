import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { DefaultPageComponent } from './default-page/default-page.component';
import { AbstractUiComponentComponent } from './abstract-ui-component/abstract-ui-component.component';
import { ButtonElementComponent } from './button-element/button-element.component';
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
import {  } from '@angular/forms';

@NgModule({
    declarations: [
        AbstractUiComponentComponent,
        SideBarComponent,
        DefaultPageComponent,
        ButtonElementComponent,
        LeftPanelComponent,
        RightPanelComponent,
        MiddlePanelComponent,
        DialogOverviewExampleDialog
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
        MatInputModule
    ],
    exports: [AbstractUiComponentComponent, SideBarComponent, DefaultPageComponent, ButtonElementComponent, DialogOverviewExampleDialog, LeftPanelComponent]
})
export class AllComponentModule { }
