import { Injectable } from '@angular/core';


/**
 * Service permetant d'envoyer des messages
 */
@Injectable()
export class AfriflashMailerProvider {

    private USER_ID = 'user_QmOizyaioLVmyFLXa5MBP';

    private SERVICE_ID = 'gmail';

    private TEMPLATE_ID = 'template_OUkgD7OH';

    /**
     * Envoie un message
     * @param to Informations destination
     * @param from Informations source
     * @param annonceTitle Titre de l'annonce en question
     * @param messageHtml Message
     */
    public send(to: { toEmail: string, toName: string, replyTo: string},
                from: {fromName: string, fromEmail: string, from_: string},
                annonceTitle: string, messageHtml: string) {

        const params = {
            user_id: this.USER_ID,
            service_id: this.SERVICE_ID,
            template_id: this.TEMPLATE_ID,
            template_params: {
                to_email: to.toEmail,
                to_name: to.toName,
                from_name: from.fromName,
                from_email: from.fromEmail,
                from_: from.from_,
                reply_to: to.replyTo,
                annonce_title: annonceTitle,
                message_html: messageHtml
            }
        };

        const headersInfos = {
            'Content-type': 'application/json'
        };

        const options = {
            method: 'POST',
            headers: headersInfos,
            body: JSON.stringify(params)
        };

        return fetch('https://api.emailjs.com/api/v1.0/email/send', options);
    }

}
