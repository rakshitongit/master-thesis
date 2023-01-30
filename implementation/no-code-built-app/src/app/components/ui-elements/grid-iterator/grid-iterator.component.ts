import { Component, Input, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HelperService } from 'src/app/services/helper.service';

@Component({
    selector: 'app-grid-iterator',
    templateUrl: './grid-iterator.component.html',
    styleUrls: ['./grid-iterator.component.scss']
})
export class GridIteratorComponent implements OnInit {

    @Input()
    prop: any

    position!: { x: string, y: string }

    dataModel: any = []

    ths: string[] = []

    constructor(private helper: HelperService) { }

    ngOnInit(): void {
        this.getData()
        this.position = this.prop.cssProperty.dropPoint
        this.position.x = (parseInt(this.position.x) / 4).toString()
    }

    async getData() {
        this.dataModel = await lastValueFrom(this.helper.getDataFromKey(this.prop.property.dataModelKey))
        this.ths = Object.keys(this.dataModel.data[0])
    }

}
