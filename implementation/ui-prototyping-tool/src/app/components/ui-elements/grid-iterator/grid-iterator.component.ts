import { Component, Input, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { GridIteratorProperty } from 'src/app/classes/concrete-classes';
import { CommunicationService } from 'src/app/services/communication.service';
import { DataModelService } from 'src/app/services/data-model.service';

@Component({
    selector: 'app-grid-iterator',
    templateUrl: './grid-iterator.component.html',
    styleUrls: ['./grid-iterator.component.scss']
})
export class GridIteratorComponent implements OnInit {

    @Input()
    prop!: GridIteratorProperty

    dataModels: any[] = []

    constructor(private shared: CommunicationService, private dataService: DataModelService) { }

    ngOnInit(): void {
        this.getDataModels()
    }

    async getDataModels() {
        try {
            this.dataModels = await firstValueFrom(this.dataService.getAllData())
        } catch (e) {
            console.error(e)
        }
    }

    updateMasterView() {
        this.shared.saveMasterView()
    }

}
