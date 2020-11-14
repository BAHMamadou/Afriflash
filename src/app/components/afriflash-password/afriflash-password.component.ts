import {Component, Input, OnInit} from '@angular/core';
import { AfriflashHttpUserProvider } from 'src/providers/afriflash-http/afriflash-http-user.provider';
import { AfriflashSessionProvider } from 'src/providers/afriflash-session/afriflash-session.provider';
import { AfriflashTranslateProvider } from 'src/providers/afriflash-translate/afriflash-translate.provider';
import { AfriflashControlAuthenticationProvider } from 'src/providers/afriflash-control-fields/afriflash-control-authentication.provider';
import { AfriflashControlRegistrationProvider } from 'src/providers/afriflash-control-fields/afriflash-control-registration.provider';

@Component({
  selector: 'afriflash-password',
  templateUrl: './afriflash-password.component.html',
  styleUrls: ['./afriflash-password.component.scss'],
})
export class AfriflashPasswordComponent implements OnInit {

  /**
   * L'utilisateur qui se connecte
   */
  @Input() public user: {
    email: string,
    id: string,
    idToken: string,
    image: string,
    name: string,
    objectId: string,
    provider: string,
    subscriptionDate: string,
    token: string,
    password?: string
  };

  /**
   * Données à transmettre au serveur
   */
  public data: {
    userId: string,
    email: string,
    password: string,
    newPassword: string
  };

  /**
   * Message d'erreur
   */
  public errorMsg: string;

  /**
   * Type d'erreur
   */
  public errorType: string;

  /**
   * Stock la confirmation du mot de passe
   */
  public confirmPassword: string;

  /**
   * Mot de passe courant
   */
  public currentPassword: string;

  constructor(private userProvider: AfriflashHttpUserProvider,
              private session: AfriflashSessionProvider,
              private translate: AfriflashTranslateProvider,
              private controlFields: AfriflashControlRegistrationProvider) { }

  ngOnInit() {
      this.init();
  }


  public init() {
          // Récupérer le user session
          this.session.getItem('socialusers').then(
              (user) => {
                  this.user = user;
                  // initialisation de l'objet data
                  this.data = {
                              userId: this.user.objectId,
                              email: this.user.email,
                              password: '',
                              newPassword: '',
                          };
                  this.confirmPassword = '';
                  this.currentPassword = this.user.password;
              }
          );
  }

  /**
   * Modifie le mot de passe
   */
  public async update() {
    const url = 'login/update-password';
    if (this.controlPass(this.data)) {
      console.log(this.data);
      this.updatePass(url);

    }
  }

  /**
   * Modifier le mot de passe
   * @param url url
   */
  private updatePass(url) {
    // Envoyé le mot de passe courant
    this.data.password = this.currentPassword;
    console.log(this.data);
    this.userProvider.updatePassword(url, this.data).subscribe(
      (userUpdated) => {
          // mettre à jour la session
          this.session.setItem('socialusers', userUpdated);
          this.errorType = 'validate';
          this.errorMsg = 'Votre mot de passe a bien été modifié';
      }
    );
  }

  /**
   * Contrôle la conformité de la confirmation mot de passe
   */
  private controlPass(data: {
    userId: string,
    password: string,
    newPassword: string
  }) {
      if (this.controlFields.controlPassword(data.newPassword)) {
        if (this.controlFields.controlConfirmPassword(this.confirmPassword)) {
          return true;
        }
      }
      this.errorType = 'error';
      this.errorMsg = 'Renseignez correctement les champs';
      return false;
  }

  /**
   * recupère la valeur du champ
   * @param field champ
   * @param event évenement émis
   */
  getData(field: any, event) {
    this.data[field] = event.detail.value;
  }

}
