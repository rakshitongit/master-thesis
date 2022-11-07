import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './side-bar/side-bar.component';
import { DefaultPageComponent } from './default-page/default-page.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { AbstractUiComponentComponent } from './abstract-ui-component/abstract-ui-component.component';
import { ButtonElementComponent } from './button-element/button-element.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { RightPanelComponent } from './right-panel/right-panel.component';
import { MiddlePanelComponent } from './middle-panel/middle-panel.component';

@NgModule({
    declarations: [
        AbstractUiComponentComponent,
        SideBarComponent,
        DefaultPageComponent,
        ButtonElementComponent,
        LeftPanelComponent,
        RightPanelComponent,
        MiddlePanelComponent
    ],
    imports: [
        CommonModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatToolbarModule,
        MatGridListModule
    ],
    exports: [AbstractUiComponentComponent, SideBarComponent, DefaultPageComponent, ButtonElementComponent]
})
export class AllComponentModule { }
