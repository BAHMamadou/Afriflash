import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AfriflashControlRegistrationProvider } from 'src/providers/afriflash-control-fields/afriflash-control-registration.provider';
import { AfriflashHttpUserProvider } from 'src/providers/afriflash-http/afriflash-http-user.provider';
import { AfriflashModalProvider } from 'src/providers/afriflash-modal/afriflash-modal.provider';
import { AfriflashSessionProvider } from '../../../../providers/afriflash-session/afriflash-session.provider';
import {AfriflashUserModel} from '../../../../models/afriflash-user.model';

@Component({
  selector: 'afriflash-user-registration',
  templateUrl: './afriflash-user-registration.component.html',
  styleUrls: ['./afriflash-user-registration.component.scss', '../registration-theme.scss'],
})
export class AfriflashUserRegistrationComponent implements OnInit {

    /**
     * Message d'erreur à afficher si un problème survient
     */
    public errorMsg: string;

    /**
     * Etat du spinner de chargement
     */
    public hideSpinner = true;

    /**
     * Homme ou Femme
     */
    public gender = 'Homme';

    /**
     * lastname de l'utilisateur
     */
    public lastName: string;

    /**
     * firstname de l'utilisateur
     */
    public firstName: string;

    /**
     *  Adresse mail de l'utilisateur
     */
    public email: string;

    /**
     * Numéro de téléphone de la personne
     */
    public phone: string;

    /**
     * Mot de passe
     */
    public password: string;

    /**
     * Mot de passe confirmé
     */
    public confirmPassword: string;

    /**
     * Placeholder du mot de passe
     */
    public passwordPlaceholder: string;

    /**
     * Placeholder du mot de passe
     */
    public dateOfBirth: Date;

    /**
     * Source d'appel du component
     */
    @Input() public source = 'registration';
    /**
     * Type d'utilisateur
     */
    @Input() public userType;

    /**
     * Role de l'utilisateur
     */
    @Input() public role = 'INTERVENANT';
    /**
     * Action de l'utilisateur
     */
    @Input() public action: string;

    /**
     * utilisateur à modifier
     */
    @Input() public userUpdate: AfriflashUserModel;


    /**
     * Contrôle l'accès au mot de passe
     */
    public pwdCheck = false;

    constructor(private navCtrl: NavController,
                private controlFiels: AfriflashControlRegistrationProvider,
                private translateService: TranslateService,
                private httpUser: AfriflashHttpUserProvider,
                private session: AfriflashSessionProvider,
                private modal: AfriflashModalProvider) {
                  this.getMessage('INFO_BULLE.REGISTRATION.INFO.PASSWORD', 'passwordPlaceholder');
                 }


    /**
     * Initialisation de la page
     */
    ngOnInit() {
        if (this.action === 'update') {
            this.init();
        }
    }

    public init() {
        this.firstName = this.userUpdate.firstName;
        this.lastName = this.userUpdate.lastName;
        this.phone = this.userUpdate.phoneNumber;
        this.email = this.userUpdate.email;
        this.gender = this.userUpdate.genderOfUser;
        this.dateOfBirth = this.userUpdate.dateOfBirth;
        this.role = this.userUpdate.typeOfUser;
    }
    /**
     * Récupère la date de naissance
     * @param event évenement émis
     */
    public getDate(event: any) {
      this.dateOfBirth = event.target.value;
    }

    public getGender(gender: string) {
      this.gender = gender;
    }

    /**
     * Enregistre un nouvel utilisateur
     */
    public async registration() {

      // Test si les champs sont existants
      if (this.lastName && this.password &&
          this.confirmPassword && this.gender &&
          this.firstName && this.phone && this.dateOfBirth) {

          const fieldsValues = {
            lastName: this.lastName,
            firstName: this.firstName,
            email: this.email,
            phone: this.phone,
            gender: this.gender,
            password: this.password,
            confirmPassword: this.confirmPassword
          };

          const result = this.controlFiels.registration(fieldsValues);

          this.hideSpinner = result.hideSpinner;

          if (result.message != null) {
            this.getMessage(result.message, 'errorMsg');
          } else {
            this.errorMsg = result.message;

            const userId = await this.session.getItem('userId');
            const roleAuthor = await this.session.getItem('role');
            let userCreatedAuthor: {};

            if (roleAuthor !== null && userId !== null) {
                userCreatedAuthor = {
                                       authorId: userId,
                                       role: roleAuthor };
              }

            let body = {};
            if (this.email && this.email !== '') {
                body = {
                  firstName: this.firstName,
                  lastName: this.lastName,
                  gender: this.gender,
                  email: this.email,
                  password: this.password,
                  phoneNumber: this.phone,
                  dateOfBirth: this.dateOfBirth,
                  userCreatedAuthorId: userCreatedAuthor
                };
            } else {
                body = {
                  firstName: this.firstName,
                  lastName: this.lastName,
                  gender: this.gender,
                  password: this.password,
                  phoneNumber: this.phone,
                  dateOfBirth: this.dateOfBirth,
                  userCreatedAuthorId: userCreatedAuthor
                };
            }
            if (this.role === 'MANAGER') {
                this.saveManager(body).subscribe(
                    (user) => {
                            this.modal.dismiss({ displayRegistrationConfirmation: true });
                    }
                );
            } else if (this.role === 'COMMERCIAL') {
                this.saveCommercial(body).subscribe(
                    (user) => {
                        this.modal.dismiss({ displayRegistrationConfirmation: true });
                    }
                );
            } else if (this.role === 'INTERVENANT') {
                this.saveIntervennant(body).subscribe(
                    (user) => {
                        this.modal.dismiss({ displayRegistrationConfirmation: true });
                    }
                );
            } else {
                console.log('Test ***************** TOTO' );
                this.saveClient(body).subscribe(
                    (user) => {
                        console.log('Test ***************** TOTO' + user);
                        if (this.source === 'registration') {
                            this.navCtrl.navigateForward('/', {
                                queryParams: { displayRegistrationConfirmation: true }
                            });
                        } else {
                            this.modal.dismiss({ displayRegistrationConfirmation: true });
                        }
                    }
                );
            }

          }

      } else {
        this.getMessage('INFO_BULLE.EMPTY_FIELD', 'errorMsg');
      }
    }

    /**
     * Renvoie le bon message
     * @param message message à afficher
     * @param attribut attribut à utiliser pour stocker le message
     */
    private getMessage(message: string, attribut: string) {
      this.translateService.get(message).subscribe((res: string) => {
          if (attribut === 'errorMsg') {
            this.errorMsg = res;
          } else {
            this.passwordPlaceholder = res;
          }
      });
    }

    /**
     * Close la modal
     */
    public closeModal() {
      this.modal.dismiss({ displayRegistrationConfirmation: false });
    }

    /**
     * Enregistrer un client
     * @param body corps de la requête
     */
    private saveClient(body: {}) {
      return this.httpUser.save('user/client/save', body);
    }
    /**
     * Enregistrer un intervennant
     * @param body corps de la requête
     */
    private saveIntervennant(body: {}) {
        return this.httpUser.save('user/employe/intervenant/save', body);
    }

    /**
     * Enregistrer un commercial
     * @param body corps de la requête
     */
    private saveCommercial(body: {}) {
        return this.httpUser.save('user/employe/commercial/save', body);
    }
    /**
     * Enregistrer un manager
     * @param body corps de la requête
     */
    private saveManager(body: {}) {
        return this.httpUser.save('user/employe/manager/save', body);
    }

    getUserType(role: string) {
        this.role = role;
    }



    /**
     * Modification d'un nouvel utilisateur
     */
    public async updateUser() {

        // Test si les champs sont existants
        if (this.lastName && this.password &&
            this.confirmPassword && this.gender &&
            this.firstName && this.phone && this.dateOfBirth) {

            const fieldsValues = {
                lastName: this.lastName,
                firstName: this.firstName,
                email: this.email,
                phone: this.phone,
                gender: this.gender,
                password: this.password,
                confirmPassword: this.confirmPassword
            };

            const result = this.controlFiels.registration(fieldsValues);

            this.hideSpinner = result.hideSpinner;

            if (result.message != null) {
                this.getMessage(result.message, 'errorMsg');
            } else {
                this.errorMsg = result.message;

                const userId = await this.session.getItem('userId');
                const roleAuthor = await this.session.getItem('role');
                let userCreatedAuthor: {};

                if (roleAuthor !== null && userId !== null) {
                    userCreatedAuthor = {
                        authorId: userId,
                        role: roleAuthor };
                }

                let body = {};
                if (this.email && this.email !== '') {
                    body = {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        gender: this.gender,
                        email: this.email,
                        password: this.password,
                        phoneNumber: this.phone,
                        dateOfBirth: this.dateOfBirth,
                        userCreatedAuthorId: userCreatedAuthor
                    };
                } else {
                    body = {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        gender: this.gender,
                        password: this.password,
                        phoneNumber: this.phone,
                        dateOfBirth: this.dateOfBirth,
                        userCreatedAuthorId: userCreatedAuthor
                    };
                }
                if (this.role === 'MANAGER') {
                    this.updateManager(body).subscribe(
                        (user) => {
                            this.modal.dismiss({ displayRegistrationConfirmation: true });
                        }
                    );
                } else if (this.role === 'COMMERCIAL') {
                    this.updateCommercial(body).subscribe(
                        (user) => {
                            this.modal.dismiss({ displayRegistrationConfirmation: true });
                        }
                    );
                } else if (this.role === 'INTERVENANT') {
                    this.updateIntervennant(body).subscribe(
                        (user) => {
                            this.modal.dismiss({ displayRegistrationConfirmation: true });
                        }
                    );
                } else {
                    this.updateClient(body).subscribe(
                        (user) => {
                                this.modal.dismiss({ displayRegistrationConfirmation: true });
                        }
                    );
                }

            }

        } else {
            this.getMessage('INFO_BULLE.EMPTY_FIELD', 'errorMsg');
        }
    }


    /**
     * Modification d'un client
     * @param body corps de la requête
     */
    private updateClient(body: {}) {
        return this.httpUser.save('user/client/update', body);
    }

    /**
     * Modification d'un intervennant
     * @param body corps de la requête
     */
    private updateIntervennant(body: {}) {
        return this.httpUser.save('user/employe/intervenant/update', body);
    }

    /**
     * Modification d'un commercial
     * @param body corps de la requête
     */
    private updateCommercial(body: {}) {
        return this.httpUser.save('user/employe/commercial/update', body);
    }
    /**
     * Modification d'un manager
     * @param body corps de la requête
     */
    private updateManager(body: {}) {
        return this.httpUser.save('user/employe/manager/update', body);
    }

    /**
     * Switch vers le mot de passe
     * @param event événement
     */
    public togglePassword(event: any) {
        this.pwdCheck = event.detail.checked;
    }
}



