import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {NavController, AlertController, MenuController} from '@ionic/angular';
import {AfriflashPopoverProvider} from 'src/providers/afriflash-popover/afriflash-popover.provider';
import {AfriflashModalProvider} from 'src/providers/afriflash-modal/afriflash-modal.provider';
import {AfriflashConfigProvider} from 'src/providers/afriflash-config/afriflash-config.provider';
import {AfriflashSessionProvider} from 'src/providers/afriflash-session/afriflash-session.provider';
import {AfriflashObservablesProvider} from 'src/providers/afriflash-observables/afriflash-observables.provider';
import {AfriflashWebsocketProvider} from 'src/providers/afriflash-websocket/afriflash-websocket.provider';
import {AfriflashLoginComponent} from "../afriflash-authentication/afriflash-login.component";
import {Socialusers} from "../../../models/afriflash-social-users.model";

@Component({
    selector: 'afriflash-header',
    templateUrl: './afriflash-header.component.html',
    styleUrls: ['./afriflash-header.component.scss'],
})
export class AfriflashHeaderComponent implements OnInit {

    /**
     * Icon du menu
     */
    @Input() icon: string;

    /**
     * Logo de l'application
     */
    @Input() logo: string;

    /**
     * Notification image
     */
    @Input() notification: string;

    /**
     * Home
     */
    @Input() home: string;

    /**
     * Activation de l'ombre
     * Si activée = true
     */
    @Input() shadow = true;

    /**
     * Event sur le bouton principal du header
     */
    @Output() clickButton = new EventEmitter<string>();


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
    public socialusers: Socialusers;

    /**
     * utilisateurs connecté
     */
    public user: Socialusers;

    /**
     * url du photo de profile
     */
    public src = './assets/icon/users.svg';

    /**
     * Basculer vers le menu deroulant ou non
     */
    public toggle = false;

    /**
     * Lien de la page
     */
    public page: string;

    constructor(private navCtrl: NavController,
                private alertController: AlertController,
                public popoverController: AfriflashPopoverProvider,
                public modalController: AfriflashModalProvider,
                public config: AfriflashConfigProvider,
                public session: AfriflashSessionProvider,
                public observableProvider: AfriflashObservablesProvider,
                private modal: AfriflashModalProvider,
                private menu: MenuController) {
    }

    ngOnInit() {
        this.init();
        // Dans le cas ou on se connecte ou se deconnecte
        this.observableProvider.isAuth.subscribe(
            (isAuth) => {
                if (isAuth) {
                    this.init();
                    this.src = this.user.image ? this.user.image : './assets/icon/users.svg';
                    this.status = 'connected';
                    this.toggle = false;
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
     * Rédirige l'utilisateur vers l'accueil
     */
    public goHome() {
        this.page = 'home';
        this.navCtrl.navigateRoot('/home');
    }

    /**
     * Permet d'être redirigé sur la page de la fonctionnalité sélectionné
     * @param page : string
     */
    public goToPage(page: string) {
        this.page = page;
        this.navCtrl.navigateForward(page);
    }

    /**
     * Affiche le menu déroulant
     */
    public toggleSubMenu() {
        this.toggle = !this.toggle;
    }

    /**
     * Déconnecte l'utilisateur et le redirige vers la page Authent
     */
    public logOut() {
        this.page = null;
        this.session.clear().then(
            (_) => {
                this.observableProvider.isAuth.emit(false);
                this.status = 'disconnected';
                this.navCtrl.navigateForward('/');
            }
        );
    }

    public async goToLoginPage() {
        this.closeMenu();
        const props = {
            display: true
        };
        await this.modal.create(AfriflashLoginComponent, 'my-custom-modal-css', props);
    }

    /**
     * Affiche une dialog d'information
     */
    public async search() {

        const alert = await this.alertController.create({
            header: 'ALERT.ALERT_HOME.TITLE',
            cssClass: 'my-custom-alert',
            buttons: [
                {
                    text: 'ALERT.ALERT_HOME.YES',
                    handler: () => {
                        this.navCtrl.navigateForward('/tabs/home');
                    }
                },
                {
                    text: 'ALERT.ALERT_HOME.NO'
                }
            ]
        });
        await alert.present();
    }

    public async goToMyAdd(myAnnonces: string) {
      const currentUser = await this.session.getItem('socialusers');
      console.log(currentUser)
      if (currentUser) {
        this.goToPage(myAnnonces);
      } else {
        const props = {
          action: 'myad',
        };
        await this.modal.create(AfriflashLoginComponent, 'my-custom-modal-css', props);
        const data: { displayRegistrationConfirmation: boolean } = await this.modal.getData();
        if (data && data.displayRegistrationConfirmation) {
          this.goToPage(myAnnonces);
        }

      }

    }
}
