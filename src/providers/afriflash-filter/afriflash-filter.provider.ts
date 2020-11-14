import { Injectable } from '@angular/core';
import { AfriflashDateProvider } from '../afriflash-date/afriflash-date.provider';

@Injectable()
export class AfriflashFilterProvider {


    constructor(private dateManager: AfriflashDateProvider) {}

    /**
     * Compare deux object en fonction du champ lastName
     * @param obj1
     * @param obj2
     */
    public compareByLastName(obj1: any, obj2: any) {

        if (obj1.lastName > obj2.lastName) {
            return 1;
        } else {
            return -1;
        }
    }

    /**
     * Compare deux object en fonction du champ lastName
     * @param obj1
     * @param obj2
     */
    public filtrerByTypeUser(obj1: any, acountType) {

        if (obj1.annonce.compteType === acountType) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Compare deux object en fonction du champ lastName
     * @param obj1
     * @param obj2
     */
    public compareByClientLastName(obj1: any, obj2: any) {

        if (obj1.client.lastName > obj2.client.lastName) {
            return 1;
        } else {
            return -1;
        }
    }

    /**
     * Compare deux object en fonction du champ dateOfCreation
     * @param obj1
     * @param obj2
     */
    public compareByCreationDate(obj1: any, obj2: any) {
        const dateManager = new AfriflashDateProvider();
        return dateManager.formatDateTime(obj1.dateOfCreation)
             - dateManager.formatDateTime(obj2.dateOfCreation);
    }
    /**
     * Compare deux object en fonction du champ dateOfCreation
     * @param obj1
     * @param obj2
     */
    public compareBySubscribeCreationDate(obj1: any, obj2: any) {
        const dateManager = new AfriflashDateProvider();
        return dateManager.formatDateTime(obj1.subscribe.dateOfSbscription)
            - dateManager.formatDateTime(obj2.subscribe.dateOfSbscription);
    }
    /**
     * Compare deux object en fonction du champ dateOfSbscription
     * @param obj1
     * @param obj2
     */
    public compareByIncidentCreationDate(obj1: any, obj2: any) {
        const dateManager = new AfriflashDateProvider();
        return dateManager.formatDateTime(obj1.subscribe.dateOfSbscription)
            - dateManager.formatDateTime(obj2.subscribe.dateOfSbscription);
    }
    /**
     * Compare deux object en fonction du champ dateOfCreation
     * @param obj1
     * @param obj2
     */
    public compareByPayementCreationDate(obj1: any, obj2: any) {
        const dateManager = new AfriflashDateProvider();
        return dateManager.formatDateTime(obj1.dateOfPayment)
            - dateManager.formatDateTime(obj2.dateOfPayment);
    }

    /**
     * Compare deux object en fonction du champ dateToSubscribePayment
     * @param obj1
     * @param obj2
     */
    public compareByDatePayed(obj1: any, obj2: any) {
        const dateManager = new AfriflashDateProvider();
        return dateManager.formatDateTime(obj1.dateToSubscribePayment)
            - dateManager.formatDateTime(obj2.dateToSubscribePayment);
    }

    public cmpByOldAnnonces(obj1: any, obj2: any) {
        // tslint:disable-next-line: no-unused-expression
        const bool = new Date(obj1.creationDate) > new Date(obj2.creationDate) ?  1 : -1;
        return bool;
    }

    public cmpByRecentAnnonces(obj1: any, obj2: any) {
        // tslint:disable-next-line: no-unused-expression
        const bool = new Date(obj1.creationDate) > new Date(obj2.creationDate) ?  -1 : 1;
        return bool;
    }
}
