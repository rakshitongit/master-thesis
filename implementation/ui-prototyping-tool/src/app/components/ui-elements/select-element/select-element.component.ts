import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { OptionElementProperty, SelectElementProperty } from 'src/app/classes/concrete-classes';
import { CommunicationService } from 'src/app/services/communication.service';
import { DialogOverviewExampleDialog } from '../../left-panel/left-panel.component';

@Component({
    selector: 'app-select-element',
    templateUrl: './select-element.component.html',
    styleUrls: ['./select-element.component.scss']
})
export class SelectElementComponent implements OnInit {

    @Input()
    prop!: SelectElementProperty

    constructor(private shared: CommunicationService, private dialog: MatDialog) { }

    ngOnInit(): void {
    }

    async addNewOption() {
        const dialogRef = this.dialog.open(AddOptionDialogComponent, {
            width: '250px',
            data: new OptionElementProperty(),
        });

        let result = await firstValueFrom(dialogRef.afterClosed())
        if (result) {
            console.log(result)
            this.prop.options.push(result)
            this.shared.saveMasterView()
        }
    }

    deleteOption(option: OptionElementProperty) {
        this.prop.options = this.prop.options.filter(o => o !== option)
        this.updateMasterView()
    }

    updateMasterView() {
        this.shared.saveMasterView()
    }

}


@Component({
    templateUrl: './add-option.dialog.html',
    styleUrls: ['./select-element.component.scss']
})
export class AddOptionDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
        @Inject(MAT_DIALOG_DATA) public option: OptionElementProperty,
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}