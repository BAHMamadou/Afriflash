import { Component, OnInit, Input } from '@angular/core';
import { AfriflashSessionProvider } from 'src/providers/afriflash-session/afriflash-session.provider';
import { AfriflashHttpUserProvider } from 'src/providers/afriflash-http/afriflash-http-user.provider';
import { AfriflashControlAuthenticationProvider } from 'src/providers/afriflash-control-fields/afriflash-control-authentication.provider';

@Component({
    selector: 'afriflash-informations',
    templateUrl: './afriflash-informations.component.html',
    styleUrls: ['./afriflash-informations.component.scss'],
})
export class AfriflashInformationsComponent implements OnInit {

    /**
     * L'utilisateur qui se connecte
     */
    public user: {
        email: string,
        id: string,
        idToken: string,
        image: string,
        name: string,
        objectId: string,
        provider: string,
        subscriptionDate: string,
        token: string
    };

    /**
     * Message d'erreur ou de succès
     */
    public message: string;

    /**
     * Permet de modifier les informations quand c'est un utilisateur qui s'est inscrit
     * via le site même (provider === email)
     */
    @Input() public isCanModified: boolean;

    /**
     * Permet d'activé ou de désactiver le formulaire
     */
    public disabled = true;

    /**
     * Permet de stocker les données à modifier
     */
    public data: {
        userId: string,
        password: string,
        name: string,
        email: string
    };

    constructor(private session: AfriflashSessionProvider,
                private userProvider: AfriflashHttpUserProvider,
                private controlField: AfriflashControlAuthenticationProvider) { }

    ngOnInit() {

        // Récupérer le user session
        this.session.getItem('socialusers').then(
            (user) => {
                this.user = user;
                this.data = {
                    userId: this.user.objectId,
                    password: null,
                    name: this.user.name,
                    email: this.user.email
                };
            }
        );
    }

    /**
     * Modifie les données
     */
    public update() {
        this.disabled = true;
        const url = 'login/update-informations';
        console.log(this.data)
        if (this.controlForm()) {
            this.userProvider.updateInfos(url, this.data).subscribe(
                (userUpdated) => {
                    // mettre à jour la session
                    this.session.setItem('socialusers', userUpdated);
                    this.message = 'Données modifiées avec succés';
                }
            );
        } else {
            this.message = 'Veuillez remplir correctement les champs';
        }
    }

    /**
     * Active les champs
     */
    public able() {
        this.disabled = false;
    }

    /**
     * recupère la valeur du champ
     * @param field champ
     * @param event évenement émis
     */
    getData(field: any, event) {
        this.data[field] = event.detail.value;
    }

    /**
     * Contrôle les données
     */
    public controlForm() {
        if (this.data.name.trim() !== '' && this.data.email &&
            this.controlField.controlLogin(this.data.email)) {
            return true;
        }
        return true;
    }
}
