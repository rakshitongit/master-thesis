import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { View } from 'src/app/classes/concrete-classes';
import { HelperService } from 'src/app/services/helper.service';

@Component({
    selector: 'app-master-view-component',
    templateUrl: './master-view.component.html',
    styleUrls: ['./master-view.component.scss'],
})
export class MasterViewComponent implements OnInit {

    masterView!: View

    // This component does not have any variants
    constructor(private helper: HelperService, private route: ActivatedRoute) { }

    async ngOnInit() {
        try {
            this.route.data.subscribe(data => {
                this.masterView = data["view"]
            })
            this.masterView.cssProperty.height = (parseInt(this.masterView.cssProperty.height) * 2).toString()
            this.masterView.cssProperty.width = (parseInt(this.masterView.cssProperty.width) * 2).toString()
        } catch (e) {
            console.error(e)
        }
    }
}