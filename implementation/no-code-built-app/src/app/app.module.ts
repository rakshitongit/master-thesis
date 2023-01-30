import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllComponentsModule } from './components/all-components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AllComponentsModule,
        AppRoutingModule,
        BrowserAnimationsModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true,
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
