import {Component, Input, OnInit} from '@angular/core';
import {Socialusers} from '../../../models/afriflash-social-users.model';
import {Router} from '@angular/router';
import {SocialloginService} from '../../../providers/afriflash-http/sociallogin.service';
import {GoogleLoginProvider, FacebookLoginProvider, AuthService} from 'angular-6-social-login';
import {AfriflashObservablesProvider} from '../../../providers/afriflash-observables/afriflash-observables.provider';
import {AfriflashModalProvider} from '../../../providers/afriflash-modal/afriflash-modal.provider';
import {AfriflashSessionProvider} from '../../../providers/afriflash-session/afriflash-session.provider';
import {AfriflashHttpUserProvider} from 'src/providers/afriflash-http/afriflash-http-user.provider';
import {AfriflashControlAnnonceProvider} from '../../../providers/afriflash-control-fields/afriflash-control-annonce.provider';

@Component({
    selector: 'app-afriflash-login',
    templateUrl: './afriflash-login.component.html',
    styleUrls: ['./afriflash-login.component.scss'],
})
export class AfriflashLoginComponent implements OnInit {
    @Input() public display: boolean;

    public response;
    public socialusers = new Socialusers();

    public connect = true;

    /**
     * Login de connection
     */
    public login: string;

    /**
     * nom de l'utilisateur
     */
    public name: string;

    /**
     * Mot de pass
     */
    public password: string;

    /**
     * Login d'inscription
     */
    public loginSubscribe: string;

    /**
     * Mot de pass pour l'inscription
     */
    public passwordSubscribe: string;

    /**
     * Action effectué
     */
    @Input() public action;

    /**
     * Mot de pass pour l'inscription
     */
    public nameSubscribe: string;

    /**
     * Message à afficher
     */
    public message: string;

    constructor(
        public OAuth: AuthService,
        // tslint:disable-next-line:no-shadowed-variable
        private SocialloginService: SocialloginService,
        private router: Router,
        private observerService: AfriflashObservablesProvider,
        private modal: AfriflashModalProvider,
        private session: AfriflashSessionProvider,
        private userService: AfriflashHttpUserProvider,
        private controleFilds: AfriflashControlAnnonceProvider
    ) {
    }

    ngOnInit() {
    }

    public async socialSignIn(socialProvider: string) {
        let socialPlatformProvider;
        if (socialProvider === 'facebook') {
            socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        } else if (socialProvider === 'google') {
            socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        }
        this.OAuth.signIn(socialPlatformProvider).then(socialusers => {
            // Requete dans la base pour verifier si l'user existe déja
            console.log('Authentication');
            const body = {
                email: socialusers.email,
                password: '',
                type: 'social'
            };
            this.userService.getUserByLogin('login/user/', body).subscribe(
                (userInfo) => {
                    console.log('User Info')
                    console.log(userInfo)
                    // Dans le cas ou l'utilisateur est déja inscrit
                    if (userInfo) {
                        this.session.setItem('socialusers', userInfo.socialUser).then(
                            (user) => {
                                this.observerService.isAuth.emit(true);
                                this.modal.dismiss();
                            }
                        );
                    } else {
                        // Dans le cas ou l'utilisateur n'est pas encore inscrit
                        this.Savesresponse(socialusers);
                    }
                }
            );
        });
    }

    Savesresponse(socialusers: Socialusers) {
        this.userService.savesResponse('login/save', socialusers).subscribe((res: any) => {
            this.socialusers = res;
            this.response = res.userDetail;
            this.session.setItem('socialusers', this.socialusers).then(
                (user) => {
                    this.observerService.isAuth.emit(true);
                    this.modal.dismiss();
                }
            );

        });
    }

    public signIn() {
        this.connect = !this.connect;
    }

    public subscribe() {
        this.socialusers.name = this.nameSubscribe;
        this.socialusers.email = this.loginSubscribe;
        this.socialusers.image = '';
        this.socialusers.token = '';
        this.socialusers.id = 'afriflashId';
        this.socialusers.provider = (this.controleFilds.controlEmail(this.loginSubscribe)) ? 'email' : 'telephone';
        this.socialusers.password = this.passwordSubscribe;
        const body = {
            email: this.socialusers.email,
            password: this.socialusers.password,
            type: 'normal'
        };
        this.userService.getUserByLogin('login/user/', body).subscribe(
            (userInfo) => {
                console.log('User Info')
                console.log(userInfo)
                // Dans le cas ou l'utilisateur est déja inscrit
                if (userInfo) {
                    this.message = '';
                } else {
                    // Dans le cas ou l'utilisateur n'est pas encore inscrit
                    this.Savesresponse(this.socialusers);
                }
            }
        );
    }

    public connection() {
        this.socialusers.email = this.login;
        this.socialusers.provider = (this.login && this.controleFilds.controlEmail(this.login)) ? 'email' : 'telephone';
        this.socialusers.password = this.password;
        console.log(this.socialusers);
        const body = {
            email: this.socialusers.email,
            password: this.socialusers.password,
            type: 'normal'
        };
        this.userService.getUserByLogin('login/user/', body).subscribe(
            (userInfo) => {
                console.log('User Info')
                console.log(userInfo)
                // Dans le cas ou l'utilisateur est déja inscrit
                if (userInfo) {
                    this.session.setItem('socialusers', userInfo.socialUser).then(
                        (user) => {
                            this.observerService.isAuth.emit(true);
                            this.modal.dismiss();
                        }
                    );
                }
            }
        );
    }

    /**
     * Close la modal
     */
    public closeModal() {
        this.modal.dismiss({displayRegistrationConfirmation: false});
    }
}
