import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { View } from 'src/app/classes/concrete-classes';

@Component({
    selector: 'app-abstract-view',
    templateUrl: './abstract-view.component.html',
    styleUrls: ['./abstract-view.component.scss']
})
export class AbstractViewComponent implements OnInit {

    view!: View

    constructor(private route: ActivatedRoute) { }


    ngOnInit(): void {
        this.route.data.subscribe(data => {
            this.view = data['view']
            this.view.cssProperty.height = (parseInt(this.view.cssProperty.height) * 2).toString()
            this.view.cssProperty.width = (parseInt(this.view.cssProperty.width) * 2).toString()
        })
    }

}
