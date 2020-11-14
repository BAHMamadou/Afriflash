import { Component, OnInit, Input } from '@angular/core';
import { AfriflashControlAnnonceProvider } from 'src/providers/afriflash-control-fields/afriflash-control-annonce.provider';
import { AfriflashModalProvider } from 'src/providers/afriflash-modal/afriflash-modal.provider';
import { AfriflashMailerProvider } from 'src/providers/afriflash-mailer/afriflash-mailer.provider';

@Component({
  selector: 'app-afriflash-message-form',
  templateUrl: './afriflash-message-form.component.html',
  styleUrls: ['./afriflash-message-form.component.scss'],
})
export class AfriflashMessageFormComponent implements OnInit {

  /**
   * Nom de l'utilisateur
   */
  public userName: string;

  /**
   * Mail de l'utilisateur
   */
  public email: string;

  /**
   * Message à envoyé
   */
  public message: string;

  /**
   * Annonce concernée
   */
  @Input() public annonce: {
    _id: string,
    creationDate: any,
    creationDateCustomize: any,
    user: any,
    annonce: {
      category: string,
      subCategory: string,
      compteType: string,
      annonceType: string,
      annonceTitle: string,
      description: string,
      product: {
        nameProduct: string,
        stateProduct: string,
        statusProduct: string,
        featureSize: string,
        featureMeasure: string,
        nbElement: string,
        dateProduct: string,
      },
      price: {
        value: any,
        devise: string,
      },
      photos: {
          photo_1: string,
          photo_2: string,
          photo_3: string,
      }
    },
    adress: {
      country: string,
      city: string,
      details: string
    },
    informations: {
      nameOrPseudo: string,
      mail: string,
      number: string,
      displayNumber: boolean
    }

  };

  /**
   * Afficher le spinner ou non
   */
  public displaySpinner: boolean;

  /**
   * Message de succcès
   */
  public successMsg: string;

  /**
   * Message d'erreur
   */
  public errorMsg: string;

  constructor(private controlForm: AfriflashControlAnnonceProvider,
              private modal: AfriflashModalProvider,
              private mailer: AfriflashMailerProvider) {

  }

  ngOnInit() {
    console.log(this.annonce)
  }

  /**
   * Récupère le message
   * @param event
   */
  public handleMessage(event) {
      this.message = event.target.value;
  }

  /**
   * Close la modal
   */
  public closeModal() {
    this.modal.dismiss({ displayRegistrationConfirmation: false });
  }

  /**
   * Envoie le message
   */
  public sendMessage() {
    this.displaySpinner = true;
    if (this.userName && this.userName.trim() !== '' &&
        this.controlForm.controlEmail(this.email) &&
        this.message && this.message.trim() !== '') {
          this.errorMsg = null;
          const to = {
            toEmail: this.annonce.informations.mail,
            toName: this.annonce.user.name,
            replyTo: this.email
          };
          const from = {
            fromName: this.userName,
            fromEmail: this.email,
            from_: this.email
          };
          this.mailer.send(to, from, this.annonce.annonce.annonceTitle, this.message).then((httpResponse) => {
            if (httpResponse.ok) {
                console.log('Your mail is sent!');
                this.successMsg = 'Votre message à bien été envoyé. Veuillez vérifier régulièrement votre boîte mail.';
                this.displaySpinner = false;
                this.userName = null;
                this.email = null;
                this.message = null;
            } else {
                return httpResponse.text()
                .then(text => Promise.reject(text));
            }
          })
          .catch((error) => {
              console.log('Oops... ' + error);
              this.errorMsg = 'Votre message n\'a pas été envoyé';
              this.successMsg = null;
              this.displaySpinner = false;
          });


        } else {
          this.errorMsg = 'Attention veuillez renseigner tous les champs';
          this.successMsg = null;
          this.displaySpinner = false;
        }
  }

}
