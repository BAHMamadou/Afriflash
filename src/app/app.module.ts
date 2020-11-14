import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';


import {AfriflashTranslateProvider} from 'src/providers/afriflash-translate/afriflash-translate.provider';
import {AfriflashObservablesProvider} from 'src/providers/afriflash-observables/afriflash-observables.provider';
import {AfriflashFilesManagerProvider} from 'src/providers/afriflash-files-manager/afriflash-files-manager.provider';
import {AfriflashDataProvider} from 'src/providers/afriflash-data/afriflash-data.provider';
import {AfriflashControlAuthenticationProvider} from 'src/providers/afriflash-control-fields/afriflash-control-authentication.provider';
import {AfriflashControlRegistrationProvider} from 'src/providers/afriflash-control-fields/afriflash-control-registration.provider';
import {AfriflashConfigProvider} from 'src/providers/afriflash-config/afriflash-config.provider';
import {ComponentsModule} from './components/components.module';
import {AfriflashModalProvider} from 'src/providers/afriflash-modal/afriflash-modal.provider';
import {AfriflashHttpUserProvider} from 'src/providers/afriflash-http/afriflash-http-user.provider';
import {AfriflashPopoverProvider} from 'src/providers/afriflash-popover/afriflash-popover.provider';
import {AfriflashSessionProvider} from 'src/providers/afriflash-session/afriflash-session.provider';
import {AfriflashHttpLocationProvider} from 'src/providers/afriflash-http/afriflash-http-location.provider';
import {AfriflashDateProvider} from 'src/providers/afriflash-date/afriflash-date.provider';

import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {AfriflashWebsocketProvider} from 'src/providers/afriflash-websocket/afriflash-websocket.provider';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AfriflashAlertProvider} from 'src/providers/afriflash-alert/afriflash-alert.provider';

import {AuthService, AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider} from 'angular-6-social-login';
import { SocialLoginModule} from 'angular-6-social-login';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { AfriflashHttpAnnonceProvider } from 'src/providers/afriflash-http/afriflash-http-annonce.provider';
import { AfriflashControlAnnonceProvider } from 'src/providers/afriflash-control-fields/afriflash-control-annonce.provider';
import { CustomNumberPipe } from './pages/custom-number.pipe';
import { AfriflashUtilsProvider } from 'src/providers/afriflash-utils-functions/afriflash-utils.provider';
import { AfriflashFilterProvider } from 'src/providers/afriflash-filter/afriflash-filter.provider';
import { AfriflashMailerProvider } from 'src/providers/afriflash-mailer/afriflash-mailer.provider';



/**
 * Factory du loader http des fichiers de tradction
 * @param httpClient client http angular
 */
export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

const config1: SocketIoConfig = {url: 'http://localhost:3000', options: {}};

/*const config = new AuthServiceConfig([
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('948566264920-m0cdurqitil7pjq9ga95nh5guh6b54o3.apps.googleusercontent.com')
    },
    {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('2660792290840318')
    }
]);*/


export function socialConfigs() {
    return new AuthServiceConfig(
        [
            {
                id: FacebookLoginProvider.PROVIDER_ID,
                provider: new FacebookLoginProvider('2660792290840318')
            },
            {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider('948566264920-m0cdurqitil7pjq9ga95nh5guh6b54o3.apps.googleusercontent.com')
            }
        ]
    );
}
@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ComponentsModule,
        NoopAnimationsModule,
        NgxPaginationModule,
        IonicModule.forRoot(),
      //  SocialLoginModule,
        IonicStorageModule.forRoot({
            name: '__mydb',
            driverOrder: ['indexeddb', 'sqlite', 'websql']
        }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        SocketIoModule.forRoot(config1),

     //   SocialLoginModule.initialize(config)

    ],
    providers: [
        StatusBar,
        SplashScreen,
        AfriflashTranslateProvider,
        AfriflashObservablesProvider,
        AfriflashFilesManagerProvider,
        AfriflashDataProvider,
        AfriflashControlAuthenticationProvider,
        AfriflashControlRegistrationProvider,
        AfriflashConfigProvider,
        AfriflashModalProvider,
        AfriflashHttpUserProvider,
        AfriflashPopoverProvider,
        AfriflashSessionProvider,
        AfriflashHttpLocationProvider,
        AfriflashDateProvider,
        AfriflashWebsocketProvider,
        AfriflashAlertProvider,
        AuthService,
        YoutubeVideoPlayer,
        AfriflashHttpAnnonceProvider,
        AfriflashControlAnnonceProvider,
        AfriflashUtilsProvider,
        AfriflashFilterProvider,
        AfriflashMailerProvider,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {
            provide: AuthServiceConfig,
            useFactory: socialConfigs
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
