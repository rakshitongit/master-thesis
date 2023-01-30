import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { View } from 'src/app/classes/concrete-classes';
import { HelperService } from 'src/app/services/helper.service';
import { firstValueFrom } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-default',
    styleUrls: ['./default.component.scss'],
    templateUrl: './default.component.html'
})
export class DefaultComponent implements OnInit, OnDestroy {

    mobileQuery!: MediaQueryList;

    activate: boolean = true

    private _mobileQueryListener: () => void

    masterView: View = new View()

    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private helper: HelperService, private userService: UserService, private router: Router) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }


    async ngOnInit() {
        this.masterView = await firstValueFrom(this.helper.getData())
    }

    logOut() {
        this.userService.logOut()
        this.router.navigateByUrl('/login')
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

}