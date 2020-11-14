import {Component, OnInit, Input} from '@angular/core';
import {AlertController, MenuController, NavController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {AfriflashObservablesProvider} from 'src/providers/afriflash-observables/afriflash-observables.provider';
import {AfriflashModalProvider} from "../../../providers/afriflash-modal/afriflash-modal.provider";
import {AfriflashLoginComponent} from "../afriflash-authentication/afriflash-login.component";
import {Socialusers} from "../../../models/afriflash-social-users.model";
import {AfriflashPopoverProvider} from "../../../providers/afriflash-popover/afriflash-popover.provider";
import {AfriflashConfigProvider} from "../../../providers/afriflash-config/afriflash-config.provider";
import {AfriflashSessionProvider} from "../../../providers/afriflash-session/afriflash-session.provider";
import {AfriflashTranslateProvider} from "../../../providers/afriflash-translate/afriflash-translate.provider";
import {AuthService} from "angular-6-social-login";

@Component({
    selector: 'afriflash-menu',
    templateUrl: './afriflash-menu.component.html',
    styleUrls: ['./afriflash-menu.component.scss'],
})
/**
 * Menu latéral de l'application
 */
export class AfriflashMenuComponent implements OnInit {

    /**
     * Etat du menu
     * true = ouvert
     */
    @Input() isOpen: boolean;

    @Input() status = 'disconnected';

    /**
     * Teste si l'utilisateur est authentifier
     */
    public isAuth: boolean;

    /**
     * Le nombre de notifications non lu
     */
    public count: number;

    /**
     * Teste si le type de plateforme
     */
    public isWeb: boolean;

    /**
     * utilisateurs connecté
     */
    public user: Socialusers;

    /**
     * url du photo de profile
     */
    public src = './assets/icon/users.svg';

    constructor(private navCtrl: NavController,
                private alertController: AlertController,
                public popoverController: AfriflashPopoverProvider,
                public config: AfriflashConfigProvider,
                public translate: AfriflashTranslateProvider,
                public session: AfriflashSessionProvider,
                public observableProvider: AfriflashObservablesProvider,
                private menu: MenuController,
                public OAuth: AuthService,
                private modal: AfriflashModalProvider) {
    }

    ngOnInit() {
        this.init();
        // Dans le cas ou on se connecte ou on se deconnecte
        this.observableProvider.isAuth.subscribe(
            (isAuth) => {
                if (isAuth) {
                    this.init();
                    this.src = this.user.image ? this.user.image : './assets/icon/users.svg';
                    this.status = 'connected';
                } else {
                    this.status = 'disconnected';
                    this.src = './assets/icon/users.svg';
                }
            }
        );
        this.isWeb = this.config.isWeb();
    }

    public init() {
        this.session.getItem('socialusers').then(
            (user) => {
                this.user = user;
                console.log(this.user)
                if (this.user) {
                    this.status = 'connected';
                    this.src = this.user.image ? this.user.image : './assets/icon/users.svg';
                }
            });

    }

    /**
     * Ferme le menu lors du clique sur le bouton
     */
    public closeMenu() {
        this.menu.close();
    }

    /**
     * Permet d'être redirigé sur la page de la fonctionnalité sélectionné
     * @param page : string
     */
    public goToPage(page: string) {
        this.navCtrl.navigateForward(page);
        this.menu.close();
    }

    /**
     * Déconnecte l'utilisateur et le rédirige vers la page d'accueil
     */
    public async disconnect() {
        if (this.user && this.user.id !== 'afriflashId') {
            await this.OAuth.signOut();
        }
        await this.session.clear();
        this.observableProvider.isAuth.emit(false);
        this.status = 'disconnected';
        this.navCtrl.navigateForward('/');
        this.menu.close();
    }

    /**
     * Rédirige l'utilisateur vers la page de connexion
     */
    public connect() {
        this.navCtrl.navigateForward('authentication');
        this.menu.close();
    }

    /**
     * Permet de changer la langue
     * @param language langue courant
     */
    public changeLanguage(language: string) {
        //  this.translate.use(language);
        this.observableProvider.translateEmiter.emit(language);
    }

    public async goToLoginPage() {
        this.closeMenu();
        const props = {
            display: true
        };
        await this.modal.create(AfriflashLoginComponent, 'my-custom-modal-css', props);
    }

    public async goToMyAdd(myAnnonces: string) {
        const currentUser = await this.session.getItem('socialusers');
        if (currentUser) {
            this.goToPage(myAnnonces);
        } else {
            const props = {
                action: 'myad',
            };
            await this.modal.create(AfriflashLoginComponent, 'my-custom-modal-css', props);
            const data: { displayRegistrationConfirmation: boolean } = await this.modal.getData();
            if (data && data.displayRegistrationConfirmation) {
                console.log(data);
                this.goToPage(myAnnonces);
            }
        }

    }
}
