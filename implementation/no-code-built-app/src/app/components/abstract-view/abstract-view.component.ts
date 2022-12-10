import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { View } from 'src/app/classes/concrete-classes';
import { HelperService } from 'src/app/services/helper.service';

@Component({
    selector: 'app-abstract-view',
    templateUrl: './abstract-view.component.html',
    styleUrls: ['./abstract-view.component.scss']
})
export class AbstractViewComponent implements OnInit {

    view!: View

    tasks!: any[]

    experiment: any

    constructor(private route: ActivatedRoute, private helper: HelperService, private snackbar: MatSnackBar) {
        this.route.data.subscribe(data => {
            this.view = data['view']
            this.view.cssProperty.height = (parseInt(this.view.cssProperty.height) * 2).toString()
            this.view.cssProperty.width = (parseInt(this.view.cssProperty.width) * 2).toString()
        })
    }

    @HostListener('click', ['$event.target'])
    async onClick(el: any) {
        if (this.helper.analyseKeyFromDatModel(el.innerHTML, this.tasks)) {
            this.snackbar.open("Found what you are looking for, Task completed!", "Close")
            this.helper.stopTimer()
            console.log("Time required: ", this.helper.timer)
            // update experiment user
            await firstValueFrom(this.helper.updateExperimentData(this.experiment))
        } else {
            console.log("Not found!")
        }
    }

    async ngOnInit() {
        this.experiment = await firstValueFrom(this.helper.getExperimentData())
        this.tasks = this.experiment.experimentTasks
    }

}
