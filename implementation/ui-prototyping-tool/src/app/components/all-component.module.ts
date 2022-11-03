import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractUiComponentComponent } from './abstract-ui-component/abstract-ui-component.component';

@NgModule({
    declarations: [
        AbstractUiComponentComponent 
    ],
    imports: [
        CommonModule,
        
    ],
    exports: [AbstractUiComponentComponent]
})
export class AllComponentModule { }
