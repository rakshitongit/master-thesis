import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { firstValueFrom } from 'rxjs';
import { View } from 'src/app/classes/concrete-classes';
import { CommunicationService } from 'src/app/services/communication.service';
import { ViewsService } from 'src/app/services/views.service';

@Component({
    selector: 'app-experiment-left-panel',
    templateUrl: './experiment-left-panel.component.html',
    styleUrls: ['./experiment-left-panel.component.scss']
})
export class ExperimentLeftPanelComponent implements OnInit {

    treeControl = new NestedTreeControl<View>(node => node.children);
    dataSource = new MatTreeNestedDataSource<View>();

    hasChild = (_: number, node: View) => !!node.children && node.children.length > 0;

    constructor(private shared: CommunicationService, private _snackBar: MatSnackBar, private viewService: ViewsService) { }

    async ngOnInit() {
        let master: View = await firstValueFrom(this.viewService.getMasterView())
        this.shared.masterView = master
        this.dataSource.data = Array.of(master)
    }

    openCanvas(node: View) {

    }

}
