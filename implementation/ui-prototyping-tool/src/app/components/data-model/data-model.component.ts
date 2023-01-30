import { Component, OnInit } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { DataModel } from 'src/app/classes/concrete-classes';
import { DataModelService } from 'src/app/services/data-model.service';

@Component({
    selector: 'app-data-model',
    templateUrl: './data-model.component.html',
    styleUrls: ['./data-model.component.scss']
})
export class DataModelComponent implements OnInit {

    dataModels: DataModel[] = []

    dataModel!: DataModel | null

    constructor(private dataService: DataModelService) { }

    ngOnInit(): void {
        this.getAllData()
    }

    async getAllData() {
        try {
            this.dataModels = await firstValueFrom(this.dataService.getAllData())
        } catch(e) {
            console.error(e)
        }
    }

    getVal(data: any) {
        return JSON.stringify(data)
    }

    async deleteModel(data: DataModel) {
        this.dataModel = null
        await lastValueFrom(this.dataService.deleteData(data))
        this.getAllData()
    }

}
