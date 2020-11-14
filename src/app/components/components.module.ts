import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AfriflashHeaderComponent} from './afriflash-header/afriflash-header.component';
import {AfriflashInfoBulleComponent} from './afriflash-info-bulle/afriflash-info-bulle.component';
import {AfriflashRegistrationComponent} from './afriflash-registration/afriflash-registration.component';

// tslint:disable-next-line:max-line-length
import {AfriflashUserRegistrationComponent} from './afriflash-registration/afriflash-user-registration/afriflash-user-registration.component';
import {AfriflashSmallButtonComponent} from './afriflash-small-button/afriflash-small-button.component';
import {AfriflashButtonComponent} from './afriflash-button/afriflash-button.component';
import {AfriflashInformationsComponent} from './afriflash-informations/afriflash-informations.component';
import {AfriflashPasswordComponent} from './afriflash-password/afriflash-password.component';


import {AfriflashFiltersComponent} from './afriflash-filters/afriflash-filters.component';
import {AfriflashOpenButtonComponent} from './afriflash-open-button/afriflash-open-button.component';

import {NgCalendarModule} from 'ionic2-calendar';
import {AfriflashAddAnnonceComponent} from './annonces/afriflash-add-annonce/afriflash-add-annonce.component';
import {AfriflashMenuComponent} from './afriflash-menu/afriflash-menu.component';
// tslint:disable-next-line:max-line-length
import {AfriflashVehicleCriteriaComponent} from './annonces/afriflash-add-annonce/afriflash-vehicle-criteria/afriflash-vehicle-criteria.component';
import {AfriflashLoginComponent} from './afriflash-authentication/afriflash-login.component';
// tslint:disable-next-line:max-line-length
import {AfriflashImobilierCriteriaComponent} from './annonces/afriflash-add-annonce/afriflash-imobilier-criteria/afriflash-imobilier-criteria.component';
// tslint:disable-next-line:max-line-length
import {AfriflashServiceCriteriaComponent} from './annonces/afriflash-add-annonce/afriflash-service-criteria/afriflash-service-criteria.component';
import {AfriflashUseTermsComponent} from './users/afriflash-use-terms/afriflash-use-terms.component';
import {AfriflashPrivacyPolicyComponent} from './users/afriflash-privacy-policy/afriflash-privacy-policy.component';
import { AfriflashAdComponent } from './afriflash-ads/afriflash-ad/afriflash-ad.component';
import {AfriflashAdsComponent} from './afriflash-ads/afriflash-ads.component';
import { AfriflashAdFiltersComponent } from './afriflash-ads/afriflash-ad-filters/afriflash-ad-filters.component';
import { AfriflashPaginationComponent } from './afriflash-pagination/afriflash-pagination.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CustomNumberPipe } from '../pages/custom-number.pipe';
import { AfriflashAdDetailsComponent } from './afriflash-ads/afriflash-ad-details/afriflash-ad-details.component';
import { AfriflashMessageFormComponent } from './afriflash-message-form/afriflash-message-form.component';



const declarables = [
    AfriflashHeaderComponent,
    AfriflashInfoBulleComponent,
    AfriflashRegistrationComponent,
    AfriflashUserRegistrationComponent,

    AfriflashSmallButtonComponent,
    AfriflashButtonComponent,

    AfriflashInformationsComponent,
    AfriflashPasswordComponent,
    AfriflashFiltersComponent,
    AfriflashOpenButtonComponent,
    AfriflashAddAnnonceComponent,
    AfriflashMenuComponent,
    AfriflashVehicleCriteriaComponent,
    AfriflashLoginComponent,
    AfriflashServiceCriteriaComponent,
    AfriflashImobilierCriteriaComponent,
    AfriflashPrivacyPolicyComponent,
    AfriflashUseTermsComponent,
    AfriflashAdComponent,
    AfriflashAdsComponent,
    AfriflashAdFiltersComponent,
    AfriflashPaginationComponent,
    AfriflashAdDetailsComponent,
    AfriflashMessageFormComponent
];

@NgModule({
    declarations: [...declarables, CustomNumberPipe],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        TranslateModule.forChild(),
        ReactiveFormsModule,
        NgCalendarModule,
        NgxPaginationModule
    ],
    entryComponents: [...declarables],
    exports: [...declarables]
})
export class ComponentsModule {
}
