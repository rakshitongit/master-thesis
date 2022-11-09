import { NestedTreeControl } from '@angular/cdk/tree';
import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { firstValueFrom, share } from 'rxjs';
import { View } from 'src/app/classes/concrete-classes';
import { CommunicationService } from 'src/app/services/communication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-left-panel',
    templateUrl: './left-panel.component.html',
    styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit {

    @Input('activate') activate!: boolean

    treeControl = new NestedTreeControl<View>(node => node.children);
    dataSource = new MatTreeNestedDataSource<View>();

    constructor(public dialog: MatDialog, private shared: CommunicationService, private _snackBar: MatSnackBar, private changeDetect: ChangeDetectorRef) { }

    ngOnInit(): void {
    }

    hasChild = (_: number, node: View) => !!node.children && node.children.length > 0;

    async openDialog(element: string) {
        const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
            width: '250px',
            data: { element },
        });

        let result = await firstValueFrom(dialogRef.afterClosed())
        console.log('The dialog was closed', result);
        if (result) {
            this.addElement(element)
            console.log(`trigger ${element} into canvas`)
        }
    }

    addElement(elementName: string) {
        this.shared.setAddUIElement(elementName)
    }

    addView(isMaster: boolean = false, node: View = new View()) {
        if (this.dataSource.data.length > 0 && isMaster) {
            this._snackBar.open('Master View already there!', 'Ok')
        } else if (!isMaster) {
            // add view
            let name: string | null = window.prompt('Enter name of the View')
            if (name !== null) {
                // const parentNode = this.flatNodeMap.get(node);
                let master: View = this.dataSource.data[0]
                master.children.push(View.getView(false, name))
                this.dataSource = new MatTreeNestedDataSource<View>()
                setTimeout(() => this.dataSource.data = Array.of(master), 10)
                this.changeDetect.detectChanges()
                console.log(this.dataSource.data)
                this.treeControl.expand(node)
            }
        } else {
            // master
            let masterView: View = View.getView(true, 'Master View')
            this.shared.masterView = masterView
            // masterView.children.push(View.getView(false, 'View 1'))
            this.dataSource.data = [masterView];
        }
    }

    deleteView(node: View) {
        let master: View = this.dataSource.data[0]
        master.children = master.children.filter(n => n !== node)
        this.dataSource = new MatTreeNestedDataSource<View>()
        setTimeout(() => this.dataSource.data = Array.of(master), 10)
        this.changeDetect.detectChanges()
        console.log(this.dataSource.data)
        this.shared.masterView = master
        this.treeControl.expand(node)
    }

    openCanvas(node: View) {
        console.log(node)
        // send the node to canvas
        this.shared.setCanvasView(node)
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
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
