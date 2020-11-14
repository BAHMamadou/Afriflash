import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Platform, MenuController} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AfriflashConfigProvider} from 'src/providers/afriflash-config/afriflash-config.provider';
import {AfriflashModalProvider} from '../providers/afriflash-modal/afriflash-modal.provider';
import {AfriflashUseTermsComponent} from "./components/users/afriflash-use-terms/afriflash-use-terms.component";
import {AfriflashPrivacyPolicyComponent} from "./components/users/afriflash-privacy-policy/afriflash-privacy-policy.component";
import { AfriflashSessionProvider } from 'src/providers/afriflash-session/afriflash-session.provider';
import { AfriflashObservablesProvider } from 'src/providers/afriflash-observables/afriflash-observables.provider';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {

    public stateMenu = false;

    public hiddeCookie = false;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private translate: TranslateService,
        private config: AfriflashConfigProvider,
        private menu: MenuController,
        private modal: AfriflashModalProvider,
        private session: AfriflashSessionProvider
    ) {
        this.setPlatform();
        this.verifyCookie();
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.configTranslate();
        });
    }

    public setPlatform() {
        const platforms = this.platform.platforms();
        this.config.setPlatform(platforms[0]);
    }

    /**
     * Configurer le service de traduction
     */
    public configTranslate() {
        this.translate.addLangs(['fr', 'en']);
        this.translate.setDefaultLang('fr');
    }

    menuOpening() {
        this.menu.isOpen().then((state: boolean) => {
            if (state) {
                this.menu.close();
            } else {
                this.menu.open();
            }
        });
    }

    /**
     * Pour changer l'etat du menu et appliquer le transparent gaussien sur l'ensemble de page
     * @param state l'etat du menu
     */
    public menuChanging(state: boolean) {
        this.stateMenu = state;
    }

    public async conditionsUse() {
        const props = {
            display: true
        };
        await this.modal.create(AfriflashUseTermsComponent, 'my-custom-modal-css', props);
    }

    public async privacyPpolicy() {
        const props = {
            display: true
        };
        await this.modal.create(AfriflashPrivacyPolicyComponent, 'my-custom-modal-css', props);
    }

    public async manageCookie() {
        await this.session.setItem('cookieIsCheck', true);
        this.hiddeCookie = true;
    }

    private async verifyCookie() {
        const cookieIsCheck = await this.session.getItem('cookieIsCheck');
        if (cookieIsCheck && cookieIsCheck === true) {
            this.hiddeCookie = true;
        }
    }

    contactUs() {

    }
}
