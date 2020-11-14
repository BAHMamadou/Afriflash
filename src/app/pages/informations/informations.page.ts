import { Component, OnInit } from '@angular/core';
import { AfriflashModalProvider } from 'src/providers/afriflash-modal/afriflash-modal.provider';
import { AfriflashHttpUserProvider } from 'src/providers/afriflash-http/afriflash-http-user.provider';
import { AfriflashSessionProvider } from 'src/providers/afriflash-session/afriflash-session.provider';
import { AfriflashObservablesProvider } from 'src/providers/afriflash-observables/afriflash-observables.provider';

@Component({
  selector: 'app-informations',
  templateUrl: './informations.page.html',
  styleUrls: ['./informations.page.scss'],
})
export class InformationsPage implements OnInit {

  /**
   * Contrôle l'accès aux informations
   */
  public informationsCheck = false;

  /**
   * Contrôle l'accès au mot de passe
   */
  public pwdCheck = false;

  /**
   * Contrôle l'accès aux adresses
   */
  public adressCheck = false;

  /**
   * Permet de modifier les informations quand c'est un utilisateur qui s'est inscrit
   * via le site même (provider === email)
   */
  public isCanModified = false;

  /**
   * Utilisateur connecté
   */
  public user: any;

  /**
   * Liste des adresses de l'utilisateurs
   */
  public adresses: {
    adresseId: string,
    idHome: string,
    country: string,
    region: string,
    commune: string,
    district: string,
    sector: string,
    home: string,
    state?: string
  }[];

  constructor(private modal: AfriflashModalProvider,
              private userProvider: AfriflashHttpUserProvider,
              private session: AfriflashSessionProvider,
              private observableProvider: AfriflashObservablesProvider) { }

  ngOnInit() {

    // Récupérer le user session
    this.session.getItem('socialusers').then(
      (user) => {
        this.user = user;
        if (user.provider === 'email') {
          this.isCanModified = true;
        }
      }
    );
  }

  /**
   * Switch vers les informations
   * @param event evenement
   */
  public toggleInformations(event: any) {
    this.informationsCheck = event.detail.checked;
  }

  /**
   * Switch vers le mot de passe
   * @param event événement
   */
  public togglePassword(event: any) {
    this.pwdCheck = event.detail.checked;
  }

  /**
   * Switch vers l'adresse
   * @param event événement
   */
  public toggleAdress(event: any) {
    this.adressCheck = event.detail.checked;
  }
}
