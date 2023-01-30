import { Component, Input, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { SimpleIteratorProperty } from 'src/app/classes/concrete-classes';
import { CommunicationService } from 'src/app/services/communication.service';
import { DataModelService } from 'src/app/services/data-model.service';

@Component({
    selector: 'app-simple-iterator',
    templateUrl: './simple-iterator.component.html',
    styleUrls: ['./simple-iterator.component.scss']
})
export class SimpleIteratorComponent implements OnInit {

    @Input()
    prop!: SimpleIteratorProperty

    dataModels: any[] = []

    constructor(private shared: CommunicationService, private dataService: DataModelService) { }

    ngOnInit(): void {
        this.getDataModels()
    }

    async getDataModels() {
        try {
            this.dataModels = await firstValueFrom(this.dataService.getAllData())
        } catch(e) {
            console.error(e)
        }
    }

    updateMasterView() { 
        this.shared.saveMasterView()
    }

}
