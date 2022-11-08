import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
    selector: 'app-left-panel',
    templateUrl: './left-panel.component.html',
    styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit {

    @Input('activate') activate!: boolean

    constructor(public dialog: MatDialog, private shared: CommunicationService) { }

    ngOnInit(): void {
    }

    async openDialog(element: string) {
        const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
            width: '250px',
            data: {element},
        });
      
        let result = await firstValueFrom(dialogRef.afterClosed())
        console.log('The dialog was closed', result);
        if(result) {
            this.addElement(element)
            console.log(`trigger ${element} into canvas`)
        }
    }

    addElement(elementName: string) {
        this.shared.setAddUIElement(elementName)
    }

}

@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: './dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
    constructor(
      public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
}
