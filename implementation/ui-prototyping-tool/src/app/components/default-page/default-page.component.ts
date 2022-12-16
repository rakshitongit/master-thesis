import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { baseUrl } from '../../classes/abstract-classes'
import { Router } from '@angular/router';
import { CommunicationService } from 'src/app/services/communication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-default-page',
    templateUrl: './default-page.component.html',
    styleUrls: ['./default-page.component.scss']
})
export class DefaultPageComponent implements OnInit, OnDestroy {

    mobileQuery!: MediaQueryList;

    private _mobileQueryListener: () => void

    elementName!: string
    toAddElement!: string

    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router, private shared: CommunicationService, public dialog: MatDialog) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    updateElement(elementName: string) {
        this.elementName = elementName
    }

    addElement(elementName: string) {
        this.toAddElement = elementName
    }

    deployApp() {
        // window.open(url + 'download/generate-new-app.sh', '_blank')
        window.open(baseUrl + 'no-code-app', '_blank')
    }

    openExperiments() {
        this.router.navigateByUrl('/experiments')
    }

    activate(val: boolean) {
        this.shared.activateView(val)
    }

    openPrototyping() {
        this.router.navigateByUrl('/')
    }

    async addDataModel() {
        const dialogRef = this.dialog.open(DataModelModalComponent, {
            width: '500px',
        });

        let result = await firstValueFrom(dialogRef.afterClosed())
        if (result) {
            try {
                
            } catch (e) {
                console.error(e)
            }
        }
    }

}


@Component({
    templateUrl: './data-model.modal.html'
})
export class DataModelModalComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DataModelModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private service: UserService
    ) { }

    form!: FormGroup

    ngOnInit(): void {
        this.form = this.fb.group({ importCsv: ['', Validators.required], key: ['', Validators.required] })
    }

    async submitData() {
        const file = this.form.value["importCsv"]
        console.log(file)
        await firstValueFrom(this.service.uploadData(file, this.form.value["key"]))
    }

    onNoClick() {

    }

}