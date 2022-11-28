import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { firstValueFrom } from 'rxjs';
import { Variant, View } from 'src/app/classes/concrete-classes';
import { CommunicationService } from 'src/app/services/communication.service';
import { ExperimentsService } from 'src/app/services/experiments.service';
import { ViewsService } from 'src/app/services/views.service';

@Component({
    selector: 'app-experiment-left-panel',
    templateUrl: './experiment-left-panel.component.html',
    styleUrls: ['./experiment-left-panel.component.scss']
})
export class ExperimentLeftPanelComponent implements OnInit {

    treeControl = new NestedTreeControl<View>(node => node.children);
    dataSource = new MatTreeNestedDataSource<View>();
    currentExperimentVariant!: Variant

    @Input('currentVariant')
    currentVariant!: Variant

    hasChild = (_: number, node: View) => !!node.children && node.children.length > 0;

    constructor(private shared: CommunicationService, private _snackBar: MatSnackBar, private viewService: ViewsService, private experimentS: ExperimentsService) { }

    async ngOnInit() {
        let master: View = await firstValueFrom(this.viewService.getMasterView())
        if(this.currentVariant.masterView == undefined) {
            this.currentVariant.masterView = master
        }
        this.dataSource.data = Array.of(master)
    }

    openCanvas(node: View) {
        this.shared.setExperimentCanvasView(node)
    }

}
