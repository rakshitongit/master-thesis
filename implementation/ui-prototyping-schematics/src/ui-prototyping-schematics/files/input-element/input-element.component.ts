
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';

@Component({
    selector: 'app-input-element',
    styleUrls: ['./input-element.component.scss'],
    templateUrl: './input-element.component.html'
})
export class InputElementComponent implements OnInit {

    @Input()
    prop: any

    position!: { x: string, y: string }

    constructor(private router: Router, private service: HelperService) {
    }


    async ngOnInit() {
        this.position = this.prop.cssProperty.dropPoint
        this.position.x = (parseInt(this.position.x) / 4).toString()
    }

    async goTo() {
        if(this.prop.interactions?.length > 0) {
            const interaction = this.prop.interactions[0]
            console.log(interaction)
            this.router.navigateByUrl('/default/' + await this.service.getRoutingData(interaction.connectionId))
        }
    }

}